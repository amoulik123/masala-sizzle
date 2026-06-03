import struct
from .header import HEADER_SIZE

# Packet 6 — Car Telemetry Data
# 60 bytes per car entry, 22 cars
# After header: 2 bytes (numActiveCars + padding), then 22 × CarTelemetryData
# After car data: mfdPanelIndex(B), mfdPanelIndexSecondaryPlayer(B), suggestedGear(b)
CAR_TELE_FMT = '<HfffBbHBBH4H4B4BH4f4B'
CAR_TELE_SIZE = struct.calcsize(CAR_TELE_FMT)  # 60
CAR_TELE_PACKET_PREFIX = 2  # numActiveCars byte + padding

assert CAR_TELE_SIZE == 60, f"CarTelemetry size mismatch: {CAR_TELE_SIZE}"

ERS_MAX_STORE = 4_000_000.0  # 4 MJ in joules

# Tyre/wheel order in all arrays: [RL, RR, FL, FR]
# We remap to [FL, FR, RL, RR] for display consistency
_RL, _RR, _FL, _FR = 0, 1, 2, 3


def _reorder(arr):
    """Remap from [RL, RR, FL, FR] → [FL, FR, RL, RR]"""
    return [arr[_FL], arr[_FR], arr[_RL], arr[_RR]]


def _gear_label(g: int) -> str:
    if g == -1:
        return 'R'
    if g == 0:
        return 'N'
    return str(g)


def parse_telemetry(data: bytes, player_idx: int) -> dict | None:
    offset = HEADER_SIZE + CAR_TELE_PACKET_PREFIX + player_idx * CAR_TELE_SIZE
    if len(data) < offset + CAR_TELE_SIZE:
        return None
    f = struct.unpack_from(CAR_TELE_FMT, data, offset)
    return {
        'speed':               f[0],   # uint16 km/h
        'throttle':            f[1],   # float 0-1
        'steer':               f[2],   # float -1 to 1
        'brake':               f[3],   # float 0-1
        'clutch':              f[4],   # uint8 0-100
        'gear':                f[5],   # int8 -1=R, 0=N, 1-8
        'gearLabel':           _gear_label(f[5]),
        'rpm':                 f[6],   # uint16
        'drs':                 f[7],   # uint8 0/1
        'revLightsPercent':    f[8],   # uint8 0-100
        'revLightsBitValue':   f[9],   # uint16 bitmask
        # Arrays in raw packet order: [RL, RR, FL, FR]
        'brakesTemperature':         _reorder(list(f[10:14])),  # uint16 celsius each
        'tyresSurfaceTemperature':   _reorder(list(f[14:18])),  # uint8 celsius
        'tyresInnerTemperature':     _reorder(list(f[18:22])),  # uint8 celsius
        'engineTemperature':         f[22],  # uint16 celsius
        'tyresPressure':             _reorder(list(f[23:27])),  # float psi
        'surfaceType':               _reorder(list(f[27:31])),  # uint8
    }
