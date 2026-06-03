import struct
from .header import HEADER_SIZE

# Packet 10 — Car Damage Data
# NOTE: tyresBlister is uint8[4] (0-100), NOT float — verified from F1 24/25 spec
# Wheel order in all arrays: [RL, RR, FL, FR] → remap to [FL, FR, RL, RR]
CAR_DMG_FMT = '<4f4B4B' + 'B' * 18   # wear(f×4) damage(B×4) blister(B×4) + wing/engine fields
CAR_DMG_SIZE = struct.calcsize(CAR_DMG_FMT)

_RL, _RR, _FL, _FR = 0, 1, 2, 3


def _reorder(arr):
    return [arr[_FL], arr[_FR], arr[_RL], arr[_RR]]


def parse_damage(data: bytes, player_idx: int) -> dict | None:
    offset = HEADER_SIZE + player_idx * CAR_DMG_SIZE
    if len(data) < offset + CAR_DMG_SIZE:
        return None
    f = struct.unpack_from(CAR_DMG_FMT, data, offset)
    wear_raw = list(f[0:4])    # float 0.0-1.0
    damage_raw = list(f[4:8])  # uint8 0-100
    blister_raw = list(f[8:12])  # uint8 0-100

    return {
        'tyresWear':    _reorder(wear_raw),    # [FL, FR, RL, RR] float 0-1
        'tyresDamage':  _reorder(damage_raw),  # [FL, FR, RL, RR] uint8 0-100
        'tyresBlister': _reorder(blister_raw), # [FL, FR, RL, RR] uint8 0-100
        'frontLeftWingDamage':  f[12],
        'frontRightWingDamage': f[13],
        'rearWingDamage':       f[14],
        'floorDamage':          f[15],
        'diffuserDamage':       f[16],
        'sidepodDamage':        f[17],
        'drsFault':             bool(f[18]),
        'ersFault':             bool(f[19]),
        'gearBoxDamage':        f[20],
        'engineDamage':         f[21],
        'engineMGUHWear':       f[22],
        'engineESWear':         f[23],
        'engineCEWear':         f[24],
        'engineICEWear':        f[25],
        'engineMGUKWear':       f[26],
        'engineTCWear':         f[27],
        'engineBlown':          bool(f[28]) if len(f) > 28 else False,
        'engineSeized':         bool(f[29]) if len(f) > 29 else False,
    }
