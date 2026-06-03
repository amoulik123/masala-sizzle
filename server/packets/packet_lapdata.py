import struct
from .header import HEADER_SIZE

# Packet 2 — Lap Data
# 56 bytes per car, up to 22 cars
# After header: 1 byte (numCars), then 22 × LapData entries, then 2 bytes (time trial indices)
LAP_FMT = '<IIHBHBHBHBffffBBBBBBBBBBBBBBBHHB'
LAP_SIZE = struct.calcsize(LAP_FMT)
LAP_PACKET_PREFIX = 1  # numCars byte

PIT_STATUS = {0: 'none', 1: 'pitting', 2: 'in_pit_area'}
DRIVER_STATUS = {0: 'garage', 1: 'flying_lap', 2: 'in_lap', 3: 'out_lap', 4: 'on_track'}
RESULT_STATUS = {0: 'invalid', 1: 'inactive', 2: 'active', 3: 'finished',
                 4: 'dnf', 5: 'dsq', 6: 'not_classified', 7: 'retired'}


def parse_lapdata(data: bytes, player_idx: int) -> dict | None:
    offset = HEADER_SIZE + LAP_PACKET_PREFIX + player_idx * LAP_SIZE
    if len(data) < offset + LAP_SIZE:
        return None
    f = struct.unpack_from(LAP_FMT, data, offset)

    # Sector time reconstruction: actual_ms = minutes * 60000 + ms_part
    def sector_ms(ms_part, minutes):
        return int(minutes) * 60000 + int(ms_part)

    return {
        'lastLapTimeMs':     f[0],   # uint32
        'currentLapTimeMs':  f[1],   # uint32
        # f[2]=s1_ms_part, f[3]=s1_minutes
        'sector1TimeMs':     sector_ms(f[2], f[3]),
        # f[4]=s2_ms_part, f[5]=s2_minutes
        'sector2TimeMs':     sector_ms(f[4], f[5]),
        # f[6]=delta_front_ms, f[7]=delta_front_min
        # f[8]=delta_leader_ms, f[9]=delta_leader_min
        'lapDistance':       f[10],  # float metres (can be negative)
        'totalDistance':     f[11],  # float metres
        'safetyCarDelta':    f[12],  # float
        'lapDistanceFull':   f[13],  # float
        'carPosition':       f[14],  # uint8
        'currentLapNum':     f[15],  # uint8
        'pitStatus':         f[16],  # uint8
        'numPitStops':       f[17],  # uint8
        'sector':            f[18],  # uint8 (0/1/2)
        'currentLapInvalid': bool(f[19]),
        'penalties':         f[20],  # uint8 seconds
        'totalWarnings':     f[21],
        'cornerCuttingWarnings': f[22],
        'gridPosition':      f[23],  # uint8
        'driverStatus':      f[24],  # uint8
        'resultStatus':      f[25],  # uint8
        'pitLaneTimerActive': bool(f[26]),
        'pitLaneTimeInLaneMs': f[27],  # uint16
        'pitStopTimerMs':    f[28],  # uint16? — actually part of trailing fields
    }
