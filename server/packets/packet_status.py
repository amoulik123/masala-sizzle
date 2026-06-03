import struct
from .header import HEADER_SIZE

# Packet 7 — Car Status Data
# 55 bytes per car, 22 cars, no packet-level prefix
CAR_STATUS_FMT = '<BBBBBfffHHBBHBBBbfffBfffB'
CAR_STATUS_SIZE = struct.calcsize(CAR_STATUS_FMT)

ERS_MAX_STORE = 4_000_000.0  # 4 MJ

ERS_DEPLOY_MODES = {0: 'None', 1: 'Medium', 2: 'Hotlap', 3: 'Overtake'}

TYRE_COMPOUNDS_ACTUAL = {
    16: 'Soft', 17: 'Medium', 18: 'Hard', 19: 'C1', 20: 'C2', 21: 'C3', 22: 'C4', 23: 'C5',
    7: 'Inter', 8: 'Wet',
}
TYRE_COMPOUNDS_VISUAL = {
    16: 'Soft', 17: 'Medium', 18: 'Hard',
    7: 'Inter', 8: 'Wet', 15: 'Unknown',
}


def parse_status(data: bytes, player_idx: int) -> dict | None:
    offset = HEADER_SIZE + player_idx * CAR_STATUS_SIZE
    if len(data) < offset + CAR_STATUS_SIZE:
        return None
    f = struct.unpack_from(CAR_STATUS_FMT, data, offset)
    ers_joules = f[19]
    ers_pct = min(100.0, max(0.0, (ers_joules / ERS_MAX_STORE) * 100.0))
    return {
        'tractionControl':      f[0],   # uint8 0=off 1=med 2=full
        'antiLockBrakes':       f[1],   # uint8 0/1
        'fuelMix':              f[2],   # uint8 0=lean..3=rich
        'frontBrakeBias':       f[3],   # uint8 %
        'pitLimiterStatus':     f[4],   # uint8 bool
        'fuelInTank':           f[5],   # float kg
        'fuelCapacity':         f[6],   # float kg
        'fuelRemainingLaps':    f[7],   # float laps
        'maxRPM':               f[8],   # uint16
        'idleRPM':              f[9],   # uint16
        'maxGears':             f[10],  # uint8
        'drsAllowed':           f[11],  # uint8 bool
        'drsActivationDistance': f[12], # uint16 metres
        'actualTyreCompound':   f[13],  # uint8
        'actualTyreName':       TYRE_COMPOUNDS_ACTUAL.get(f[13], 'Unknown'),
        'visualTyreCompound':   f[14],  # uint8
        'visualTyreName':       TYRE_COMPOUNDS_VISUAL.get(f[14], 'Unknown'),
        'tyresAgeLaps':         f[15],  # uint8
        'vehicleFiaFlags':      f[16],  # int8
        'enginePowerICE':       f[17],  # float watts
        'enginePowerMGUK':      f[18],  # float watts
        'ersStoreEnergy':       ers_joules,   # float joules
        'ersStorePercent':      round(ers_pct, 1),
        'ersDeplMode':          f[20],  # uint8 0-3
        'ersDeplModeName':      ERS_DEPLOY_MODES.get(f[20], 'Unknown'),
        'ersHarvestedMGUH':     f[21],  # float joules
        'ersHarvestedMGUK':     f[22],  # float joules
        'ersDeployedThisLap':   f[23],  # float joules
        'networkPaused':        f[24],  # uint8 bool
    }
