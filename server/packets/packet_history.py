import struct
from .header import HEADER_SIZE

# Packet 11 — Session History Data
# Per-car: sent periodically for each car separately
# Layout after header:
#   carIdx(B) numLaps(B) numTyreStints(B)
#   bestLapTimeLapNum(B) bestSector1LapNum(B) bestSector2LapNum(B) bestSector3LapNum(B)
#   = 7 bytes
#   LapHistoryData[100]  = 100 × 14 bytes = 1400 bytes
#   TyreStintHistoryData[8] = 8 × 3 bytes = 24 bytes

HIST_PREFIX_FMT = '<BBBBBBB'
HIST_PREFIX_SIZE = struct.calcsize(HIST_PREFIX_FMT)

LAP_HIST_FMT = '<IHBHBHBB'
LAP_HIST_SIZE = struct.calcsize(LAP_HIST_FMT)  # 14

STINT_FMT = '<BBB'
STINT_SIZE = struct.calcsize(STINT_FMT)

# Lap validity bitmask
LAP_VALID = 0x01
S1_VALID = 0x02
S2_VALID = 0x04
S3_VALID = 0x08


def _sector_ms(ms_part: int, minutes: int) -> int:
    return int(minutes) * 60000 + int(ms_part)


def parse_history(data: bytes) -> dict | None:
    offset = HEADER_SIZE
    if len(data) < offset + HIST_PREFIX_SIZE:
        return None
    pf = struct.unpack_from(HIST_PREFIX_FMT, data, offset)
    car_idx = pf[0]
    num_laps = pf[1]
    num_stints = pf[2]
    best_lap_num = pf[3]
    best_s1_lap = pf[4]
    best_s2_lap = pf[5]
    best_s3_lap = pf[6]

    offset += HIST_PREFIX_SIZE
    laps = []
    for i in range(min(num_laps, 100)):
        if len(data) < offset + LAP_HIST_SIZE:
            break
        lf = struct.unpack_from(LAP_HIST_FMT, data, offset)
        offset += LAP_HIST_SIZE
        flags = lf[7]
        laps.append({
            'lapNum':      i + 1,
            'lapTimeMs':   lf[0],
            'sector1Ms':   _sector_ms(lf[1], lf[2]),
            'sector2Ms':   _sector_ms(lf[3], lf[4]),
            'sector3Ms':   _sector_ms(lf[5], lf[6]),
            'lapValid':    bool(flags & LAP_VALID),
            's1Valid':     bool(flags & S1_VALID),
            's2Valid':     bool(flags & S2_VALID),
            's3Valid':     bool(flags & S3_VALID),
        })

    stints = []
    offset = HEADER_SIZE + HIST_PREFIX_SIZE + 100 * LAP_HIST_SIZE
    for _ in range(min(num_stints, 8)):
        if len(data) < offset + STINT_SIZE:
            break
        sf = struct.unpack_from(STINT_FMT, data, offset)
        offset += STINT_SIZE
        stints.append({'endLap': sf[0], 'tyreActualCompound': sf[1], 'tyreVisualCompound': sf[2]})

    return {
        'carIdx':       car_idx,
        'numLaps':      num_laps,
        'bestLapNum':   best_lap_num,
        'bestS1Lap':    best_s1_lap,
        'bestS2Lap':    best_s2_lap,
        'bestS3Lap':    best_s3_lap,
        'laps':         laps,
        'stints':       stints,
    }
