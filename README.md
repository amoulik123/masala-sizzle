# F1 25 Race Engineer

A local race engineer dashboard for F1 25 on PS5. Reads live UDP telemetry over WiFi and gives you real-time data, post-lap analysis, setup advice, and race strategy — no cloud, no subscriptions, no API keys.

![Live dashboard with tyre temps, ERS, fuel, timing, and braking zones]

---

## What it does

**Live tab**
- Speed, gear, RPM with rev light bar (15 LEDs, green → red → blue flash at limiter)
- Throttle, brake, and steering gauges
- Tyre temperatures colour-coded per compound (cold/optimal/hot/critical windows)
- Tyre wear % and blister count per corner
- ERS store % and deploy mode (None / Medium / Hotlap / Overtake)
- Fuel kg remaining + laps of fuel left
- Sector times with delta vs personal best
- Race position, DRS state, brake bias, pit stop count
- Live weather, track temp, air temp
- Safety car / virtual safety car banner
- Braking zone table per corner (entry speed, brake %, distance, apex, exit, trail braking)
- Assists display: TC, ABS, steering, braking, gearbox, ERS, DRS, racing line

**Analysis tab**
- Post-lap debrief with named corners for your circuit
- Verdict + top 3 improvements in priority order (braking → trail braking → throttle → corner speed)
- Per-corner breakdown: entry/apex/exit speed, brake pressure, braking distance, trail braking flag
- Coaching text adjusted for wheel vs controller input
- "Copy for Claude" button — formats the full report to paste into claude.ai for deeper coaching

**Evolution tab**
- Fuel-corrected lap time chart across the session
- Consistency score (standard deviation)
- Corner apex speed trends (early laps vs recent laps)
- Per-corner tyre wear chart with blistering frequency

**Setup tab**
- Baseline setup for your current circuit (all parameters: wings, diff, suspension, ARBs, ride height, camber, toe, brake bias, tyre pressures)
- Live suggestions based on telemetry: lockups → adjust bias, front wear → ARB, blistering → pressure, throttle overlap → diff

**Strategy tab**
- Pit window with optimal lap (scaled to your actual race length)
- One-stop and two-stop compound recommendations
- Undercut rating per circuit
- Live tyre degradation rate (linear regression from actual wear data)
- Projected cliff lap
- ERS and fuel status with warnings
- Weather updates and safety car strategy note

**Radio engineer**
- British English TTS voice reads lap times, tyre warnings, fuel warnings, multi-lap trend messages
- Slide-up banner for each message
- 20-message log
- Mute button

---

## Requirements

- Mac (Apple Silicon or Intel)
- Python 3.10+
- Node.js 18+
- F1 25 on PS5, same WiFi network

---

## Setup

**1. Clone the repo**
```sh
git clone https://github.com/amoulik123/masala-sizzle.git
cd masala-sizzle
```

**2. Start everything**
```sh
./start.sh
```

This installs the Python dependency (`websockets`), installs npm packages if needed, starts the Python bridge and the Vite dev server, and prints your local IP address.

**3. Configure F1 25 on PS5**

Go to: `F1 25 → Settings → Telemetry`

| Setting | Value |
|---|---|
| UDP Telemetry | On |
| Broadcast IP | Your Mac's IP (printed by start.sh) |
| UDP Port | 20777 |
| Send Rate | 60Hz |
| Format | 2025 |

**4. Open the dashboard**

```
http://localhost:5555
```

Or from your phone on the same WiFi:
```
http://<your-mac-ip>:5555
```

---

## How it works

```
PS5 F1 25
    │  UDP port 20777
    ▼
Python f1_bridge.py          ← parses binary telemetry structs
    │  WebSocket port 20778       runs lap analysis engine
    │  HTTP REST port 20779       saves laps to ./data/laps/
    ▼
Vite dev server :5555        ← proxies /ws and /api
    │
    ▼
Browser (React 19)           ← live dashboard + analysis UI
```

No cloud. Everything runs on your Mac. Lap data is saved as JSON files under `./data/laps/{trackId}/{sessionType}/{sessionUID}.json` so your history persists across sessions.

---

## Wheel vs controller

Toggle between **Wheel** and **Ctrl** in the header. This changes:

- Analysis thresholds (coasting time, brake smoothness, lockup sensitivity, wheelspin spike count)
- Coaching language ("taper brake pressure smoothly" for wheel vs "release the trigger gradually" for controller)
- What counts as a problem — jagged brake traces are normal on a controller and won't be flagged as inconsistency

---

## Phone access

The frontend works on any device on your WiFi. Open `http://<mac-ip>:5555` in a mobile browser. The Python bridge must be running on your Mac — browsers can't receive raw UDP, so the bridge is unavoidable.

For a permanent setup without leaving your Mac on, a Raspberry Pi Zero 2W (~$20) can run the Python bridge 24/7. See `start.sh` for the exact commands.

---

## Project structure

```
start.sh                   — one-command launcher
requirements.txt           — websockets>=12.0

server/
  f1_bridge.py             — UDP listener, WebSocket broadcaster, HTTP REST, lap analyser
  data_store.py            — JSON persistence
  packets/
    header.py              — 29-byte F1 25 packet header
    packet_session.py      — Packet 1: session info + assists
    packet_lapdata.py      — Packet 2: lap times, sectors, position
    packet_telemetry.py    — Packet 6: speed, throttle, brake, temps (~30Hz)
    packet_status.py       — Packet 7: ERS, fuel, tyre compound (~10Hz)
    packet_damage.py       — Packet 10: wear, blister, damage (~5Hz)
    packet_history.py      — Packet 11: full session lap history

src/
  hooks/
    useWebSocket.js        — WS connection with exponential backoff reconnect
    useTelemetry.js        — useReducer state + React context
    useRadioEngineer.js    — TTS queue, cooldown map, banner
    useInputMode.js        — wheel/controller toggle (localStorage)
  data/
    tracks.js              — 24 circuits with named corners and reference speeds
    setups.js              — 24 baseline setups + live advisor rules
    strategy.js            — pit windows, deg rates, cliff laps per circuit
    analysisConfig.js      — thresholds per input mode, tyre temp windows
    coachingMessages.js    — wheel vs controller coaching text
  components/
    live/                  — SpeedGearRPM, PedalGauges, TyreWidget, ERSWidget,
                             FuelWidget, TimingWidget, RaceInfoWidget, BrakingTable,
                             AssistsPanel, RevLightBar
    analysis/              — PostLapAnalysis, CornerCard, LapSummary, CopyButton
    evolution/             — LapTimeChart, CornerEvolution, WearPatterns, Sparkline
    setup/                 — SetupAdvisor, SetupCard
    strategy/              — RaceStrategy, PitWindow, TyreDegChart, ERSFuelWarning
    layout/                — Header, RadioBanner
    shared/                — StatusDot, Delta, GaugeBar
```

---

## Troubleshooting

**Status dot stays red (disconnected)**
- Check PS5 telemetry is set to On with the correct broadcast IP
- Make sure both PS5 and Mac are on the same WiFi network
- Try `ping <ps5-ip>` from your Mac to confirm connectivity
- Firewall: allow incoming UDP on port 20777

**No lap analysis after crossing the line**
- The bridge needs a full lap with telemetry to analyse. First lap after connecting is usually skipped.
- Check the terminal running `start.sh` for any Python errors

**TTS not working**
- The radio engineer uses the Web Speech API. Make sure your browser tab is not muted.
- Chrome/Chromium has the best en-GB voice support.

**Wrong track name showing**
- Track ID is read from the session packet. It updates a few seconds after loading into a session. If it shows "Unknown", check the F1 25 format is set to 2025 (not an older format).
