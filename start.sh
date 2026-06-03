#!/bin/bash
set -e

# ─── F1 25 Race Engineer — Mac Launcher ───────────────────────────────────────
#
# What this script does:
#  1. Checks Python 3 and Node/npm are available
#  2. Installs websockets Python package if missing
#  3. Installs npm dependencies if needed
#  4. Prints your Mac's LAN IP so you can configure the PS5
#  5. Starts the Python UDP bridge (port 20777 UDP in, 20778 WS out, 20779 HTTP)
#  6. Starts the Vite dev server (port 5555)
#
# PS5 setup:
#  F1 25 → Settings → Telemetry → UDP Telemetry: On
#  UDP IP: <the IP shown below>
#  UDP Port: 20777
#  UDP Send Rate: 60Hz
#  Format: 2025

# ── Colours ─────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
BOLD='\033[1m'

echo ""
echo -e "${BOLD}${BLUE}╔══════════════════════════════════════╗${NC}"
echo -e "${BOLD}${BLUE}║     F1 25 Race Engineer v1.0         ║${NC}"
echo -e "${BOLD}${BLUE}╚══════════════════════════════════════╝${NC}"
echo ""

# ── Check Python 3 ───────────────────────────────────────────────────────────
if ! command -v python3 &>/dev/null; then
  echo -e "${RED}✗ python3 not found. Install Python 3.10+ from https://python.org${NC}"
  exit 1
fi
PY_VER=$(python3 --version 2>&1)
echo -e "${GREEN}✓ $PY_VER${NC}"

# ── Check Node/npm ────────────────────────────────────────────────────────────
if ! command -v npm &>/dev/null; then
  echo -e "${RED}✗ npm not found. Install Node.js from https://nodejs.org${NC}"
  exit 1
fi
NODE_VER=$(node --version 2>&1)
echo -e "${GREEN}✓ Node $NODE_VER${NC}"

# ── Python deps ───────────────────────────────────────────────────────────────
if ! python3 -c "import websockets" &>/dev/null; then
  echo -e "${YELLOW}→ Installing websockets...${NC}"
  pip3 install websockets --quiet
fi
echo -e "${GREEN}✓ Python deps OK${NC}"

# ── npm deps ──────────────────────────────────────────────────────────────────
if [ ! -d node_modules ]; then
  echo -e "${YELLOW}→ Installing npm deps...${NC}"
  npm install --silent
fi
echo -e "${GREEN}✓ npm deps OK${NC}"

# ── Local IP ─────────────────────────────────────────────────────────────────
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "unknown")
echo ""
echo -e "${BOLD}┌─ PS5 Telemetry Config ───────────────────┐${NC}"
echo -e "${BOLD}│  Settings → Telemetry → UDP Telemetry    │${NC}"
echo -e "${BOLD}│  UDP IP:   ${YELLOW}${LOCAL_IP}${BOLD}                │${NC}"
echo -e "${BOLD}│  Port:     20777                          │${NC}"
echo -e "${BOLD}│  Rate:     60Hz   Format: 2025            │${NC}"
echo -e "${BOLD}└───────────────────────────────────────────┘${NC}"
echo ""
echo -e "${BOLD}  Open in browser: ${GREEN}http://localhost:5555${NC}"
echo -e "${BOLD}  From phone:      ${GREEN}http://${LOCAL_IP}:5555${NC}"
echo ""
echo -e "  ${YELLOW}Press Ctrl+C to stop${NC}"
echo ""

# ── Start Python bridge ───────────────────────────────────────────────────────
python3 server/f1_bridge.py &
BRIDGE_PID=$!
sleep 1
if kill -0 $BRIDGE_PID 2>/dev/null; then
  echo -e "${GREEN}✓ F1 Bridge started (UDP 20777 → WS 20778)${NC}"
else
  echo -e "${RED}✗ Bridge failed to start. Check server/f1_bridge.py${NC}"
  exit 1
fi

# ── Start Vite ────────────────────────────────────────────────────────────────
npm run dev &
VITE_PID=$!

# ── Cleanup on exit ───────────────────────────────────────────────────────────
trap "echo ''; echo 'Stopping...'; kill $BRIDGE_PID $VITE_PID 2>/dev/null; exit 0" INT TERM

wait $VITE_PID
