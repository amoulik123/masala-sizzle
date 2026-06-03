"""
F1 25 Race Engineer — Python UDP Bridge
Listens on UDP 20777 for F1 25 telemetry.
Broadcasts JSON via WebSocket on 20778.
Serves lap history JSON via HTTP on 20779.
"""

import asyncio
import json
import logging
import sys
import time
import threading
from collections import deque
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

import websockets
import websockets.exceptions

sys.path.insert(0, str(Path(__file__).parent.parent))
from server.packets import (
    parse_header, HEADER_SIZE,
    parse_session, parse_lapdata,
    parse_telemetry, parse_status,
    parse_damage, parse_history,
)
from server.data_store import save_lap, load_track_history, all_time_best_ms

logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s %(message)s',
    datefmt='%H:%M:%S',
)
log = logging.getLogger('f1_bridge')

UDP_PORT = 20777
WS_PORT = 20778
HTTP_PORT = 20779

# ── Shared state ─────────────────────────────────────────────────────────────

class State:
    def __init__(self):
        self.session = {}
        self.telemetry = {}
        self.status = {}
        self.lapdata = {}
        self.damage = {}
        self.session_uid = None
        self.track_id = -1
        self.session_type = 0
        self.player_idx = 0

        # Rolling telemetry buffer — last 6000 frames (~100s at 60Hz)
        self.frame_buffer: deque = deque(maxlen=6000)
        # Current lap frames
        self.current_lap_frames: list = []
        self.prev_lap_num = 0
        self.prev_last_lap_ms = 0

        # Lap analysis history (last 20 completed laps for trend detection)
        self.recent_laps: deque = deque(maxlen=20)

        # Frame counters for throttling
        self._frame_counts = {6: 0, 2: 0, 7: 0, 10: 0}

        # WebSocket clients
        self.clients: set = set()
        self.ws_queue: asyncio.Queue | None = None  # set after event loop starts

state = State()


# ── Lap analysis (rules-based) ───────────────────────────────────────────────

def ms_to_str(ms: int) -> str:
    if ms <= 0:
        return '--:--.---'
    m, rem = divmod(ms, 60000)
    s, ms_part = divmod(rem, 1000)
    return f'{m}:{s:02d}.{ms_part:03d}'


def fuel_correct(lap_ms: int, fuel_kg: float) -> int:
    """Correct lap time for fuel load: 0.035s per kg above 0."""
    correction_ms = int(fuel_kg * 0.035 * 1000)
    return max(0, lap_ms - correction_ms)


def detect_braking_events(frames: list, track_corners: list) -> list:
    """
    Find braking events and match them to named corners by lapDistance proximity.
    Returns list of corner analysis dicts.
    """
    events = []
    in_brake = False
    brake_start = None

    for i, f in enumerate(frames):
        brake = f.get('brake', 0)
        if not in_brake and brake > 0:
            # Require brake > 0 for at least 5 consecutive frames (filter micro-touches)
            if i + 5 < len(frames) and all(frames[j].get('brake', 0) > 0 for j in range(i, i + 5)):
                in_brake = True
                brake_start = i
        elif in_brake and brake == 0:
            in_brake = False
            if brake_start is not None and i > brake_start + 3:
                zone = frames[brake_start:i]
                events.append(_extract_event(zone, frames, brake_start))
                brake_start = None
    if in_brake and brake_start is not None:
        zone = frames[brake_start:]
        if len(zone) > 3:
            events.append(_extract_event(zone, frames, brake_start))

    # Match events to track corners
    return _match_to_corners(events, track_corners)


def _extract_event(zone: list, all_frames: list, start_idx: int) -> dict:
    entry_frame = zone[0]
    min_speed_idx = min(range(len(zone)), key=lambda i: zone[i].get('speed', 999))
    apex_frame = zone[min_speed_idx]

    # Exit: first frame after apex where throttle > 0.8
    exit_frame = apex_frame
    exit_idx = start_idx + min_speed_idx
    for j in range(exit_idx, min(exit_idx + 200, len(all_frames))):
        if all_frames[j].get('throttle', 0) > 0.8:
            exit_frame = all_frames[j]
            break

    # Braking distance in metres
    brake_dist = abs(entry_frame.get('lapDistance', 0) - apex_frame.get('lapDistance', 0))

    # Trail braking: frames with brake > 0 AND abs(steer) > 0.2
    trail_frames = sum(
        1 for f in zone
        if f.get('brake', 0) > 0 and abs(f.get('steer', 0)) > 0.2
    )
    trail_score = trail_frames / max(len(zone), 1)

    # Throttle overlap: frames with throttle > 0.1 AND brake > 0.1
    overlap_frames = sum(
        1 for f in zone
        if f.get('throttle', 0) > 0.1 and f.get('brake', 0) > 0.1
    )

    # Max brake pressure in zone
    max_brake = max((f.get('brake', 0) for f in zone), default=0)

    return {
        'lapDistance':    entry_frame.get('lapDistance', 0),
        'entrySpeed':     entry_frame.get('speed', 0),
        'apexSpeed':      apex_frame.get('speed', 0),
        'exitSpeed':      exit_frame.get('speed', 0),
        'maxBrake':       round(max_brake * 100),  # 0-100%
        'brakingDistance': round(brake_dist),
        'trailBrakingScore': round(trail_score, 2),
        'throttleOverlapFrames': overlap_frames,
        'hasTrailBraking': trail_score > 0.15,
        'hasThrottleOverlap': overlap_frames >= 3,
    }


def _match_to_corners(events: list, corners: list) -> list:
    """Match raw braking events to named corners by lapDistance proximity."""
    if not corners:
        return events
    matched = []
    used_corners = set()

    for ev in events:
        dist = ev['lapDistance']
        best_corner = None
        best_dist_diff = float('inf')
        for i, c in enumerate(corners):
            tolerance = c.get('tolerance', 75)
            diff = abs(dist - c.get('distanceFromStart', 0))
            if diff < tolerance and diff < best_dist_diff and i not in used_corners:
                best_dist_diff = diff
                best_corner = (i, c)
        if best_corner:
            idx, corner = best_corner
            used_corners.add(idx)
            ev['cornerName'] = corner['name']
            ev['cornerId'] = corner['id']
            ev['cornerStyle'] = corner['style']
            ev['refApexSpeed'] = corner.get('referenceApexSpeed', 0)
            ev['coachingText'] = corner.get('coachingText', '')
            ev['priority'] = corner.get('priority', 'low')
        else:
            ev['cornerName'] = f'T@{int(dist)}m'
            ev['cornerId'] = None
            ev['cornerStyle'] = 'unknown'
            ev['refApexSpeed'] = 0
            ev['coachingText'] = ''
            ev['priority'] = 'low'
        matched.append(ev)
    return matched


def analyse_lap(lap_frames: list, lap_ms: int, fuel_kg: float,
                best_lap_ms: int | None, track_corners: list,
                input_mode: str = 'wheel', session_type: int = 10) -> dict:
    """Full rules-based lap analysis. Returns analysis dict for lap_complete message."""
    if not lap_frames:
        return {}

    total_frames = len(lap_frames)
    if total_frames == 0:
        return {}

    # Full throttle % (threshold 0.98)
    full_throttle_frames = sum(1 for f in lap_frames if f.get('throttle', 0) >= 0.98)
    full_throttle_pct = round(full_throttle_frames / total_frames * 100, 1)

    # Coasting % (throttle < 0.02 AND brake == 0)
    coasting_frames = sum(
        1 for f in lap_frames
        if f.get('throttle', 0) < 0.02 and f.get('brake', 0) == 0
    )
    coasting_pct = round(coasting_frames / total_frames * 100, 1)

    # Top speed
    top_speed = max((f.get('speed', 0) for f in lap_frames), default=0)

    # Lockup detection: brake drop > threshold in 0.1s window (≈6 frames at 60Hz)
    lockup_threshold = 0.20 if input_mode == 'controller' else 0.10
    lockup_count = 0
    for i in range(6, len(lap_frames)):
        prev_b = lap_frames[i - 6].get('brake', 0)
        curr_b = lap_frames[i].get('brake', 0)
        if prev_b > 0.5 and (prev_b - curr_b) > lockup_threshold:
            lockup_count += 1

    # Braking events / corner analysis
    corner_events = detect_braking_events(lap_frames, track_corners)

    # Delta vs best
    delta_ms = (lap_ms - best_lap_ms) if best_lap_ms and best_lap_ms > 0 else None

    # Verdict
    def sign(v): return '+' if v >= 0 else ''
    if delta_ms is None:
        verdict = f'Lap: {ms_to_str(lap_ms)} (first timed lap)'
    elif delta_ms <= 0:
        verdict = f'New best! {ms_to_str(lap_ms)} ({sign(delta_ms)}{delta_ms/1000:.3f}s)'
    else:
        verdict = f'{ms_to_str(lap_ms)} — {sign(delta_ms)}{delta_ms/1000:.3f}s off best'

    # Top 3 improvements — ranked by priority then time delta
    improvements = _rank_improvements(corner_events, full_throttle_pct, lockup_count, input_mode)

    return {
        'verdict':          verdict,
        'deltaMs':          delta_ms,
        'fullThrottlePct':  full_throttle_pct,
        'coastingPct':      coasting_pct,
        'topSpeed':         top_speed,
        'lockupCount':      lockup_count,
        'cornerEvents':     corner_events,
        'priorityImprovements': improvements[:3],
        'totalFrames':      total_frames,
    }


def _rank_improvements(corners: list, full_throttle_pct: float,
                        lockup_count: int, input_mode: str) -> list:
    """Rank improvement opportunities by priority and magnitude."""
    items = []

    # High-priority corner improvements
    for c in corners:
        if c.get('priority') != 'high':
            continue
        ref = c.get('refApexSpeed', 0)
        apex = c.get('apexSpeed', 0)
        name = c.get('cornerName', '?')
        style = c.get('cornerStyle', 'medium')

        if style == 'flat' and apex < ref * 0.97:
            items.append({
                'priority': 1,
                'text': f"{name}: Corner should be flat — you lifted. Reference apex {ref} km/h, you managed {apex} km/h.",
            })
        elif ref > 0 and apex < ref * 0.93:
            gap = ref - apex
            items.append({
                'priority': 2,
                'text': f"{name}: Apex speed {gap:.0f} km/h below reference ({apex} vs {ref} km/h). {c.get('coachingText', '')}",
            })

        exit_s = c.get('exitSpeed', 0)
        entry_s = c.get('entrySpeed', 0)
        if exit_s > 0 and entry_s > 0 and exit_s < entry_s * 0.55:
            items.append({
                'priority': 3,
                'text': f"{name}: Slow exit ({exit_s} km/h). More rotation or earlier throttle pickup.",
            })

    # Medium-priority corners
    for c in corners:
        if c.get('priority') != 'medium':
            continue
        ref = c.get('refApexSpeed', 0)
        apex = c.get('apexSpeed', 0)
        name = c.get('cornerName', '?')
        if ref > 0 and apex < ref * 0.90:
            gap = ref - apex
            items.append({
                'priority': 4,
                'text': f"{name}: {gap:.0f} km/h off apex reference. {c.get('coachingText', '')}",
            })

    # Flat corner lifts (any priority)
    for c in corners:
        if c.get('cornerStyle') == 'flat' and c.get('apexSpeed', 0) < c.get('refApexSpeed', 0) * 0.97:
            name = c.get('cornerName', '?')
            if not any(name in item['text'] for item in items):
                items.append({'priority': 2, 'text': f"{name}: Should be flat. Trust the downforce."})

    # Lockup issue
    if lockup_count >= 2:
        items.append({
            'priority': 2,
            'text': f"{lockup_count} lockups detected. Reduce front brake bias by 1% or brake slightly earlier.",
        })

    # Low full throttle
    if full_throttle_pct < 60:
        items.append({
            'priority': 5,
            'text': f"Full throttle only {full_throttle_pct}% of lap. Check flat corners or exits where you're lifting early.",
        })

    # Sort by priority value (lower = more important)
    items.sort(key=lambda x: x['priority'])
    return [item['text'] for item in items]


def build_radio_lap_message(analysis: dict, sector1_ms: int, sector2_ms: int,
                             sector3_ms: int, best_s1: int, best_s2: int, best_s3: int) -> str:
    """Build the post-lap radio message."""
    parts = [analysis.get('verdict', '')]

    # Sector breakdown — flag if > 0.2s off best
    sector_notes = []
    for i, (sect_ms, best_ms, name) in enumerate([
        (sector1_ms, best_s1, 'S1'),
        (sector2_ms, best_s2, 'S2'),
        (sector3_ms, best_s3, 'S3'),
    ]):
        if sect_ms > 0 and best_ms and best_ms > 0:
            diff = sect_ms - best_ms
            if diff > 200:
                sector_notes.append(f"{name} lost {diff/1000:.1f}s")
    if sector_notes:
        parts.append('. '.join(sector_notes))

    locks = analysis.get('lockupCount', 0)
    if locks >= 2:
        parts.append(f"{locks} lockups — consider more front bias")

    ft = analysis.get('fullThrottlePct', 0)
    if ft < 60:
        parts.append(f"Full throttle only {ft}% — check flat sections")

    return '. '.join(p for p in parts if p)


def check_tyre_trend_message(recent_laps: list, input_mode: str) -> str | None:
    """Detect multi-lap degradation trends. Returns message string or None."""
    if len(recent_laps) < 3:
        return None

    last3 = list(recent_laps)[-3:]
    last5 = list(recent_laps)[-5:] if len(recent_laps) >= 5 else list(recent_laps)

    # Lap times dropping (tyre deg): last 3 each slower than the one before
    times = [lap.get('fuelCorrectedMs', 0) for lap in last3 if lap.get('fuelCorrectedMs', 0) > 0]
    if len(times) == 3 and times[2] > times[1] > times[0]:
        drop = times[2] - times[0]
        if drop > 300:
            return f"Pace dropping {drop/1000:.1f}s over last 3 laps. Tyre degradation setting in."

    # Lockups on multiple consecutive laps
    lockup_counts = [lap.get('analysis', {}).get('lockupCount', 0) for lap in last3]
    if all(c >= 2 for c in lockup_counts):
        return "Lockups on 3 consecutive laps. Reduce front brake bias one click."

    # High coasting consistently
    coast_pcts = [lap.get('analysis', {}).get('coastingPct', 0) for lap in last5]
    if coast_pcts and sum(coast_pcts) / len(coast_pcts) > 8:
        return f"Coasting average {sum(coast_pcts)/len(coast_pcts):.1f}% — check braking points."

    # Front wear accelerating
    wear_rates = []
    for i in range(1, len(last5)):
        prev_w = last5[i-1].get('frontWearAvg', 0)
        curr_w = last5[i].get('frontWearAvg', 0)
        if curr_w > 0 and prev_w > 0:
            wear_rates.append(curr_w - prev_w)
    if len(wear_rates) >= 2 and wear_rates[-1] > wear_rates[0] * 1.5 and wear_rates[-1] > 0.03:
        return "Front tyre wear accelerating. Consider pitting soon or reducing front load."

    return None


# ── UDP Protocol ─────────────────────────────────────────────────────────────

class F1UDPProtocol(asyncio.DatagramProtocol):
    def __init__(self, queue: asyncio.Queue):
        self.queue = queue

    def datagram_received(self, data: bytes, addr):
        self.queue.put_nowait(data)

    def error_received(self, exc):
        log.warning(f'UDP error: {exc}')


# ── Packet processor ─────────────────────────────────────────────────────────

async def process_packets(udp_queue: asyncio.Queue, ws_queue: asyncio.Queue):
    """Pull raw UDP bytes from queue, parse, update state, enqueue WS broadcasts."""
    state.ws_queue = ws_queue
    track_corners_cache: dict = {}

    # Lazy-load corner database (imported from frontend data if available, else empty)
    def get_corners(track_id: int) -> list:
        if track_id in track_corners_cache:
            return track_corners_cache[track_id]
        # Try loading from src/data/tracks_python.json if exported
        corners_file = Path('./src/data/tracks_python.json')
        if corners_file.exists():
            import json as _json
            data = _json.loads(corners_file.read_text())
            for tid_str, tdata in data.items():
                track_corners_cache[int(tid_str)] = tdata.get('corners', [])
        else:
            track_corners_cache[track_id] = []
        return track_corners_cache.get(track_id, [])

    while True:
        data = await udp_queue.get()
        try:
            hdr = parse_header(data)
            if hdr is None:
                continue
            if hdr['packetFormat'] not in (2025, 2024):
                continue
            pid = hdr['packetId']
            pidx = hdr['playerCarIndex']
            if pidx >= 22:
                continue
            state.player_idx = pidx

            # Update session UID
            new_uid = str(hdr['sessionUID'])
            if new_uid != state.session_uid and hdr['sessionUID'] != 0:
                if state.session_uid is not None:
                    log.info(f'New session detected: {new_uid}')
                    state.current_lap_frames.clear()
                    state.prev_lap_num = 0
                    state.prev_last_lap_ms = 0
                    state.recent_laps.clear()
                state.session_uid = new_uid

            # ── Packet 1: Session ──────────────────────────────────────────
            if pid == 1:
                sess = parse_session(data)
                if sess and sess != state.session:
                    state.session = sess
                    state.track_id = sess['trackId']
                    state.session_type = sess['sessionType']
                    await ws_queue.put(json.dumps({'type': 'session', **sess}))
                    log.info(f"Track: {sess['trackName']} | Session: {sess['sessionTypeName']}")

            # ── Packet 6: Car Telemetry ────────────────────────────────────
            elif pid == 6:
                state._frame_counts[6] = (state._frame_counts[6] + 1) % 2
                tele = parse_telemetry(data, pidx)
                if tele:
                    state.telemetry = tele
                    # Buffer frame for lap analysis
                    frame = {
                        'lapDistance': state.lapdata.get('lapDistance', 0),
                        'speed':    tele['speed'],
                        'throttle': tele['throttle'],
                        'brake':    tele['brake'],
                        'steer':    tele['steer'],
                        'gear':     tele['gear'],
                        'rpm':      tele['rpm'],
                    }
                    state.frame_buffer.append(frame)
                    state.current_lap_frames.append(frame)
                    if state._frame_counts[6] == 0:
                        await ws_queue.put(json.dumps({'type': 'telemetry', **tele}))

            # ── Packet 7: Car Status ───────────────────────────────────────
            elif pid == 7:
                state._frame_counts[7] = (state._frame_counts[7] + 1) % 6
                stat = parse_status(data, pidx)
                if stat:
                    state.status = stat
                    if state._frame_counts[7] == 0:
                        await ws_queue.put(json.dumps({'type': 'status', **stat}))

            # ── Packet 2: Lap Data ─────────────────────────────────────────
            elif pid == 2:
                state._frame_counts[2] = (state._frame_counts[2] + 1) % 3
                lap = parse_lapdata(data, pidx)
                if lap:
                    state.lapdata = lap
                    if state._frame_counts[2] == 0:
                        await ws_queue.put(json.dumps({'type': 'lapdata', **lap}))

                    # Lap completion detection
                    new_lap_num = lap['currentLapNum']
                    new_last_ms = lap['lastLapTimeMs']
                    if (new_lap_num > state.prev_lap_num and
                            new_last_ms > 0 and
                            new_last_ms != state.prev_last_lap_ms):
                        await _handle_lap_complete(lap, ws_queue, get_corners)
                    state.prev_lap_num = new_lap_num
                    state.prev_last_lap_ms = new_last_ms

            # ── Packet 10: Car Damage ──────────────────────────────────────
            elif pid == 10:
                state._frame_counts[10] = (state._frame_counts[10] + 1) % 12
                dmg = parse_damage(data, pidx)
                if dmg:
                    state.damage = dmg
                    if state._frame_counts[10] == 0:
                        await ws_queue.put(json.dumps({'type': 'damage', **dmg}))

        except Exception as exc:
            log.debug(f'Packet processing error: {exc}')


async def _handle_lap_complete(lap: dict, ws_queue: asyncio.Queue, get_corners):
    """Run analysis on a completed lap and broadcast results."""
    lap_ms = lap['lastLapTimeMs']
    lap_num = max(state.prev_lap_num, 1)
    fuel_kg = state.status.get('fuelInTank', 0)
    track_id = state.track_id
    session_type = state.session_type
    session_uid = state.session_uid or 'unknown'
    track_corners = get_corners(track_id) if track_id >= 0 else []

    # Fuel-corrected time
    fuel_corrected = fuel_correct(lap_ms, fuel_kg)

    # Determine best lap so far
    prev_best = min((l.get('fuelCorrectedMs', lap_ms) for l in state.recent_laps), default=None)

    # Run analysis on buffered frames for this lap
    analysis = analyse_lap(
        frames=list(state.current_lap_frames),
        lap_ms=lap_ms,
        fuel_kg=fuel_kg,
        best_lap_ms=prev_best,
        track_corners=track_corners,
        session_type=session_type,
    )

    # Average tyre wear
    wear = state.damage.get('tyresWear', [0, 0, 0, 0])
    front_wear_avg = (wear[0] + wear[1]) / 2 if wear else 0

    lap_record = {
        'lapNum':           lap_num,
        'lapTimeMs':        lap_ms,
        'fuelCorrectedMs':  fuel_corrected,
        'sector1Ms':        lap.get('sector1TimeMs', 0),
        'sector2Ms':        lap.get('sector2TimeMs', 0),
        'sector3Ms':        0,  # sector3 computed server-side if needed
        'valid':            not lap.get('currentLapInvalid', False),
        'fuelLoad':         fuel_kg,
        'frontBrakeBias':   state.status.get('frontBrakeBias', 56),
        'tyreCompound':     state.status.get('actualTyreCompound', 16),
        'tyresAgeLaps':     state.status.get('tyresAgeLaps', 0),
        'tyresWear':        wear,
        'tyresBlister':     state.damage.get('tyresBlister', [0, 0, 0, 0]),
        'frontWearAvg':     front_wear_avg,
        'analysis':         analysis,
        'timestamp':        time.time(),
    }
    state.recent_laps.append(lap_record)

    # Build radio message
    radio_msg = build_radio_lap_message(
        analysis,
        lap_record['sector1Ms'], lap_record['sector2Ms'], lap_record['sector3Ms'],
        0, 0, 0,
    )

    # Multi-lap trend
    trend_msg = check_tyre_trend_message(state.recent_laps, 'wheel')

    # Save to disk
    if track_id >= 0 and lap_record['valid']:
        try:
            save_lap(track_id, session_type, session_uid, lap_record)
        except Exception as exc:
            log.warning(f'Failed to save lap: {exc}')

    # Clear current lap buffer
    state.current_lap_frames.clear()

    # Broadcast
    await ws_queue.put(json.dumps({
        'type': 'lap_complete',
        **lap_record,
        'radioMessage': radio_msg,
    }))
    if radio_msg:
        await ws_queue.put(json.dumps({
            'type': 'radio_message',
            'message': radio_msg,
            'priority': 'info',
            'category': 'lap_complete',
        }))
    if trend_msg:
        await ws_queue.put(json.dumps({
            'type': 'radio_message',
            'message': trend_msg,
            'priority': 'warning',
            'category': 'multi_lap_trend',
        }))

    # Push updated history
    history = load_track_history(track_id) if track_id >= 0 else []
    all_laps = [lap for s in history for lap in s.get('laps', [])]
    best_all_time = all_time_best_ms(track_id) if track_id >= 0 else None
    session_best = min(
        (l.get('fuelCorrectedMs', 0) for l in state.recent_laps if l.get('valid') and l.get('fuelCorrectedMs', 0) > 0),
        default=None
    )
    await ws_queue.put(json.dumps({
        'type': 'history',
        'trackId': track_id,
        'laps': all_laps[-50:],  # last 50 laps for display
        'sessionLaps': list(state.recent_laps),
        'sessionBestMs': session_best,
        'allTimeBestMs': best_all_time,
    }))

    log.info(f'Lap {lap_num}: {ms_to_str(lap_ms)} (fuel-corrected: {ms_to_str(fuel_corrected)})')


# ── WebSocket broadcaster ─────────────────────────────────────────────────────

async def ws_broadcaster(ws_queue: asyncio.Queue):
    """Pull messages from queue, broadcast to all connected WS clients."""
    while True:
        msg = await ws_queue.get()
        if not state.clients:
            continue
        dead = set()
        for ws in list(state.clients):
            try:
                await ws.send(msg)
            except (websockets.exceptions.ConnectionClosed, Exception):
                dead.add(ws)
        state.clients -= dead


async def ws_handler(websocket):
    """Handle a single WebSocket client connection."""
    state.clients.add(websocket)
    client_ip = websocket.remote_address[0] if websocket.remote_address else 'unknown'
    log.info(f'WS client connected: {client_ip} (total: {len(state.clients)})')

    # Send current state immediately on connect
    try:
        if state.session:
            await websocket.send(json.dumps({'type': 'session', **state.session}))
        if state.telemetry:
            await websocket.send(json.dumps({'type': 'telemetry', **state.telemetry}))
        if state.status:
            await websocket.send(json.dumps({'type': 'status', **state.status}))
        if state.lapdata:
            await websocket.send(json.dumps({'type': 'lapdata', **state.lapdata}))
        if state.damage:
            await websocket.send(json.dumps({'type': 'damage', **state.damage}))

        # Send lap history
        track_id = state.track_id
        if track_id >= 0:
            history = load_track_history(track_id)
            all_laps = [l for s in history for l in s.get('laps', [])]
            best = all_time_best_ms(track_id)
            session_best = min(
                (l.get('fuelCorrectedMs', 0) for l in state.recent_laps
                 if l.get('valid') and l.get('fuelCorrectedMs', 0) > 0),
                default=None
            )
            await websocket.send(json.dumps({
                'type': 'history',
                'trackId': track_id,
                'laps': all_laps[-50:],
                'sessionLaps': list(state.recent_laps),
                'sessionBestMs': session_best,
                'allTimeBestMs': best,
            }))

        # Keep alive — handle ping/pong and incoming messages
        async for msg in websocket:
            try:
                req = json.loads(msg)
                if req.get('type') == 'get_history' and state.track_id >= 0:
                    history = load_track_history(state.track_id)
                    all_laps = [l for s in history for l in s.get('laps', [])]
                    await websocket.send(json.dumps({
                        'type': 'history',
                        'trackId': state.track_id,
                        'laps': all_laps[-50:],
                        'sessionLaps': list(state.recent_laps),
                        'allTimeBestMs': all_time_best_ms(state.track_id),
                    }))
            except json.JSONDecodeError:
                pass

    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        state.clients.discard(websocket)
        log.info(f'WS client disconnected (remaining: {len(state.clients)})')


# ── HTTP REST server (threading, not asyncio) ─────────────────────────────────

class HistoryHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        from urllib.parse import urlparse, parse_qs
        parsed = urlparse(self.path)
        qs = parse_qs(parsed.query)

        if parsed.path == '/api/history':
            track_id = int(qs.get('trackId', [-1])[0])
            data = load_track_history(track_id) if track_id >= 0 else []
            body = json.dumps(data).encode()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-Length', len(body))
            self.end_headers()
            self.wfile.write(body)
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, *args):
        pass  # suppress default HTTP log noise


def run_http_server():
    srv = HTTPServer(('0.0.0.0', HTTP_PORT), HistoryHandler)
    srv.serve_forever()


# ── Main ──────────────────────────────────────────────────────────────────────

async def main():
    log.info('F1 25 Race Engineer — Bridge starting')
    log.info(f'UDP listener: 0.0.0.0:{UDP_PORT}')
    log.info(f'WebSocket server: 0.0.0.0:{WS_PORT}')
    log.info(f'HTTP history API: 0.0.0.0:{HTTP_PORT}')

    udp_queue: asyncio.Queue = asyncio.Queue(maxsize=1000)
    ws_queue: asyncio.Queue = asyncio.Queue(maxsize=500)

    # UDP socket
    loop = asyncio.get_running_loop()
    transport, _ = await loop.create_datagram_endpoint(
        lambda: F1UDPProtocol(udp_queue),
        local_addr=('0.0.0.0', UDP_PORT),
    )

    # HTTP server in daemon thread
    http_thread = threading.Thread(target=run_http_server, daemon=True)
    http_thread.start()

    # WebSocket server
    ws_server = await websockets.serve(ws_handler, '0.0.0.0', WS_PORT)

    log.info('Ready. Waiting for F1 25 telemetry...')

    try:
        await asyncio.gather(
            process_packets(udp_queue, ws_queue),
            ws_broadcaster(ws_queue),
        )
    finally:
        transport.close()
        ws_server.close()


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        log.info('Bridge stopped.')
