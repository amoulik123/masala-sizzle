import struct

# PacketHeader — 29 bytes
# Verified from EA Sports F1 25 UDP specification
HEADER_FMT = '<HBBBBBQfIIBB'
HEADER_SIZE = struct.calcsize(HEADER_FMT)  # should be 29

assert HEADER_SIZE == 29, f"Header size mismatch: {HEADER_SIZE}"


def parse_header(data: bytes) -> dict | None:
    if len(data) < HEADER_SIZE:
        return None
    f = struct.unpack_from(HEADER_FMT, data, 0)
    return {
        'packetFormat':            f[0],   # uint16 — 2025 for F1 25, 2024 for F1 24
        'gameYear':                f[1],   # uint8
        'gameMajorVersion':        f[2],   # uint8
        'gameMinorVersion':        f[3],   # uint8
        'packetVersion':           f[4],   # uint8
        'packetId':                f[5],   # uint8  0-13
        'sessionUID':              f[6],   # uint64
        'sessionTime':             f[7],   # float
        'frameIdentifier':         f[8],   # uint32
        'overallFrameIdentifier':  f[9],   # uint32
        'playerCarIndex':          f[10],  # uint8  0-21
        'secondaryPlayerCarIndex': f[11],  # uint8  255 = no secondary
    }
