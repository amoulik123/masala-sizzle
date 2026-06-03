import json
import time
from pathlib import Path

DATA_ROOT = Path('./data/laps')


def save_lap(track_id: int, session_type: int, session_uid: str, lap_data: dict) -> None:
    path = DATA_ROOT / str(track_id) / str(session_type)
    path.mkdir(parents=True, exist_ok=True)
    session_file = path / f'{session_uid}.json'

    if session_file.exists():
        with open(session_file) as fh:
            session = json.load(fh)
    else:
        session = {
            'sessionUID': session_uid,
            'trackId': track_id,
            'sessionType': session_type,
            'laps': [],
            'createdAt': time.time(),
        }

    session['laps'].append(lap_data)
    session['updatedAt'] = time.time()

    with open(session_file, 'w') as fh:
        json.dump(session, fh, indent=2)


def load_track_history(track_id: int) -> list:
    """Load all sessions across all session types for a track."""
    base = DATA_ROOT / str(track_id)
    if not base.exists():
        return []
    sessions = []
    for session_type_dir in sorted(base.iterdir()):
        for session_file in sorted(session_type_dir.glob('*.json')):
            try:
                with open(session_file) as fh:
                    sessions.append(json.load(fh))
            except (json.JSONDecodeError, OSError):
                pass
    return sessions


def load_all_laps_for_track(track_id: int) -> list:
    """Flatten all laps across all sessions for a track into a single list."""
    all_laps = []
    for session in load_track_history(track_id):
        for lap in session.get('laps', []):
            lap['sessionType'] = session.get('sessionType')
            lap['sessionUID'] = session.get('sessionUID')
            all_laps.append(lap)
    return all_laps


def all_time_best_ms(track_id: int) -> int | None:
    """Return the best valid fuel-corrected lap time across all saved sessions for a track."""
    best = None
    for lap in load_all_laps_for_track(track_id):
        if not lap.get('valid', False):
            continue
        t = lap.get('fuelCorrectedMs') or lap.get('lapTimeMs')
        if t and t > 0:
            if best is None or t < best:
                best = t
    return best
