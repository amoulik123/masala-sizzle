import struct
from .header import HEADER_SIZE

# Packet 1 — Session Data
# We parse two sections:
#   1. Basic session info (first ~16 bytes after header)
#   2. Assist settings (further into the packet, around offset +90 from header)
SESSION_PARTIAL_FMT = '<BbbBHbBHHBBBBBB'
SESSION_PARTIAL_SIZE = struct.calcsize(SESSION_PARTIAL_FMT)

# Assist settings — offset from HEADER_SIZE after the partial block.
# In the F1 25 spec the assist fields appear after marshal zones, weather forecasts, etc.
# These are at approximately offset 90-100 from HEADER_SIZE.
# We use a conservative offset that matches the published spec layout.
# Field order: steeringAssist, brakingAssist, gearboxAssist, pitAssist,
#              pitReleaseAssist, ersAssist, drsAssist, dynamicRacingLine, dynamicRacingLineType
ASSIST_OFFSET = 90
ASSIST_FMT = '<BBBBBBBBB'
ASSIST_SIZE = struct.calcsize(ASSIST_FMT)

SESSION_TYPES = {
    0: 'Unknown', 1: 'Practice 1', 2: 'Practice 2', 3: 'Practice 3',
    4: 'Short Practice', 5: 'Qualifying 1', 6: 'Qualifying 2', 7: 'Qualifying 3',
    8: 'Short Qualifying', 9: 'One Shot Qualifying', 10: 'Race', 11: 'Race 2',
    12: 'Race 3', 13: 'Time Trial',
}

TRACK_IDS = {
    0: 'Melbourne', 2: 'Shanghai', 3: 'Sakhir', 4: 'Catalunya', 5: 'Monaco',
    6: 'Montreal', 7: 'Silverstone', 9: 'Hungaroring', 10: 'Spa', 11: 'Monza',
    12: 'Singapore', 13: 'Suzuka', 14: 'Yas Marina', 15: 'Austin', 16: 'Interlagos',
    17: 'Red Bull Ring', 19: 'Mexico City', 20: 'Baku', 26: 'Zandvoort', 27: 'Imola',
    29: 'Jeddah', 30: 'Miami', 31: 'Las Vegas', 32: 'Losail',
    39: 'Silverstone Reverse', 40: 'Red Bull Ring Reverse', 41: 'Zandvoort Reverse',
}

RACING_LINE_LABELS = {0: 'Off', 1: 'Corners Only', 2: 'Full'}
BRAKE_ASSIST_LABELS = {0: 'Off', 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Very High', 5: 'Extreme'}
GEARBOX_LABELS = {1: 'Manual', 2: 'Manual + Suggested', 3: 'Auto'}


def parse_session(data: bytes) -> dict | None:
    if len(data) < HEADER_SIZE + SESSION_PARTIAL_SIZE:
        return None
    f = struct.unpack_from(SESSION_PARTIAL_FMT, data, HEADER_SIZE)
    track_id = f[5]  # int8, signed — -1 means in menus
    session_type = f[6]

    result = {
        'weather':          f[0],   # uint8
        'trackTemperature': f[1],   # int8 celsius
        'airTemperature':   f[2],   # int8 celsius
        'totalLaps':        f[3],   # uint8
        'trackLength':      f[4],   # uint16 metres
        'trackId':          track_id,
        'trackName':        TRACK_IDS.get(track_id, 'Unknown'),
        'sessionType':      session_type,
        'sessionTypeName':  SESSION_TYPES.get(session_type, 'Unknown'),
        'sessionTimeLeft':  f[7],   # uint16 seconds
        'sessionDuration':  f[8],   # uint16 seconds
        'pitSpeedLimit':    f[9],   # uint8 km/h
        'gamePaused':       f[10],  # uint8 bool
        'isSpectating':     f[11],  # uint8 bool
        'spectatorCarIdx':  f[12],  # uint8
        # Assists — parsed from further in the packet
        'steeringAssist':   0,
        'brakingAssist':    0, 'brakingAssistLabel': 'Off',
        'gearboxAssist':    3, 'gearboxAssistLabel': 'Auto',
        'pitAssist':        0,
        'ersAssist':        0,
        'drsAssist':        0,
        'dynamicRacingLine': 0, 'racingLineLabel': 'Off',
    }

    # Try to parse assist settings if packet is long enough
    assist_abs_offset = HEADER_SIZE + ASSIST_OFFSET
    if len(data) >= assist_abs_offset + ASSIST_SIZE:
        try:
            af = struct.unpack_from(ASSIST_FMT, data, assist_abs_offset)
            result['steeringAssist']    = af[0]   # 0=off, 1=on
            result['brakingAssist']     = af[1]   # 0=off, 1-5=levels
            result['brakingAssistLabel'] = BRAKE_ASSIST_LABELS.get(af[1], str(af[1]))
            result['gearboxAssist']     = af[2]   # 1=manual, 2=suggested, 3=auto
            result['gearboxAssistLabel'] = GEARBOX_LABELS.get(af[2], str(af[2]))
            result['pitAssist']         = af[3]   # 0/1
            result['pitReleaseAssist']  = af[4]   # 0/1
            result['ersAssist']         = af[5]   # 0/1
            result['drsAssist']         = af[6]   # 0/1
            result['dynamicRacingLine'] = af[7]   # 0=off, 1=corners, 2=full
            result['racingLineLabel']   = RACING_LINE_LABELS.get(af[7], str(af[7]))
        except struct.error:
            pass  # packet too short — keep defaults

    return result
