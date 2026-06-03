import { useReducer, useContext, createContext, useRef, useCallback, createElement } from 'react'

// ── Initial state ─────────────────────────────────────────────────────────────
const initialState = {
  // High-freq telemetry (Packet 6) — updated ~30Hz
  speed: 0, throttle: 0, brake: 0, steer: 0,
  gear: 0, gearLabel: 'N', rpm: 0,
  revLightsPercent: 0, revLightsBitValue: 0, drs: 0,
  brakesTemperature: [0, 0, 0, 0],
  tyresSurfaceTemperature: [0, 0, 0, 0],
  tyresInnerTemperature: [0, 0, 0, 0],
  tyresPressure: [0, 0, 0, 0],
  engineTemperature: 0,

  // Status (Packet 7) — updated ~10Hz
  fuelInTank: 0, fuelCapacity: 100, fuelRemainingLaps: 0,
  ersStorePercent: 0, ersDeplMode: 0, ersDeplModeName: 'None',
  actualTyreCompound: 17, visualTyreCompound: 17,
  actualTyreName: 'Medium', visualTyreName: 'Medium',
  tyresAgeLaps: 0, frontBrakeBias: 56,
  tractionControl: 0, antiLockBrakes: 0,
  maxRPM: 15000, idleRPM: 3000,
  drsAllowed: 0,

  // Lap data (Packet 2) — updated ~20Hz
  currentLapTimeMs: 0, lastLapTimeMs: 0,
  sector1TimeMs: 0, sector2TimeMs: 0,
  lapDistance: 0, totalDistance: 0,
  carPosition: 0, currentLapNum: 0,
  pitStatus: 0, sector: 0,
  currentLapInvalid: false, numPitStops: 0,

  // Damage (Packet 10) — updated ~5Hz
  tyresWear: [0, 0, 0, 0],       // float 0-1
  tyresDamage: [0, 0, 0, 0],     // uint8 0-100
  tyresBlister: [0, 0, 0, 0],    // uint8 0-100
  drsFault: false, ersFault: false,
  gearBoxDamage: 0, engineDamage: 0,

  // Session (Packet 1)
  trackId: -1, trackName: '', sessionType: 0, sessionTypeName: '',
  totalLaps: 0, trackLength: 0, sessionUID: '',
  weather: 0, trackTemperature: 0, airTemperature: 0,
  // Assists — from session packet
  tractionControlAssist: 0,   // from status packet
  antiLockBrakesAssist: 0,    // from status packet
  steeringAssist: 0, brakingAssist: 0, brakingAssistLabel: 'Off',
  gearboxAssist: 3, gearboxAssistLabel: 'Auto',
  ersAssist: 0, drsAssist: 0,
  dynamicRacingLine: 0, racingLineLabel: 'Off',

  // Derived/history
  bestLapTimeMs: null,
  bestSectors: [null, null, null],
  lastAnalysis: null,
  lapHistory: [],         // from 'history' message
  sessionLaps: [],        // recent laps in current session
  sessionBestMs: null,
  allTimeBestMs: null,
}

// ── Reducer ───────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'telemetry':
      return { ...state,
        speed: action.speed ?? state.speed,
        throttle: action.throttle ?? state.throttle,
        brake: action.brake ?? state.brake,
        steer: action.steer ?? state.steer,
        gear: action.gear ?? state.gear,
        gearLabel: action.gearLabel ?? state.gearLabel,
        rpm: action.rpm ?? state.rpm,
        revLightsPercent: action.revLightsPercent ?? state.revLightsPercent,
        revLightsBitValue: action.revLightsBitValue ?? state.revLightsBitValue,
        drs: action.drs ?? state.drs,
        brakesTemperature: action.brakesTemperature ?? state.brakesTemperature,
        tyresSurfaceTemperature: action.tyresSurfaceTemperature ?? state.tyresSurfaceTemperature,
        tyresInnerTemperature: action.tyresInnerTemperature ?? state.tyresInnerTemperature,
        tyresPressure: action.tyresPressure ?? state.tyresPressure,
        engineTemperature: action.engineTemperature ?? state.engineTemperature,
      }

    case 'status':
      return { ...state,
        fuelInTank: action.fuelInTank ?? state.fuelInTank,
        fuelCapacity: action.fuelCapacity ?? state.fuelCapacity,
        fuelRemainingLaps: action.fuelRemainingLaps ?? state.fuelRemainingLaps,
        ersStorePercent: action.ersStorePercent ?? state.ersStorePercent,
        ersDeplMode: action.ersDeplMode ?? state.ersDeplMode,
        ersDeplModeName: action.ersDeplModeName ?? state.ersDeplModeName,
        actualTyreCompound: action.actualTyreCompound ?? state.actualTyreCompound,
        visualTyreCompound: action.visualTyreCompound ?? state.visualTyreCompound,
        actualTyreName: action.actualTyreName ?? state.actualTyreName,
        visualTyreName: action.visualTyreName ?? state.visualTyreName,
        tyresAgeLaps: action.tyresAgeLaps ?? state.tyresAgeLaps,
        frontBrakeBias: action.frontBrakeBias ?? state.frontBrakeBias,
        tractionControl: action.tractionControl ?? state.tractionControl,
        antiLockBrakes: action.antiLockBrakes ?? state.antiLockBrakes,
        maxRPM: action.maxRPM ?? state.maxRPM,
        idleRPM: action.idleRPM ?? state.idleRPM,
        drsAllowed: action.drsAllowed ?? state.drsAllowed,
      }

    case 'lapdata':
      return { ...state,
        currentLapTimeMs: action.currentLapTimeMs ?? state.currentLapTimeMs,
        lastLapTimeMs: action.lastLapTimeMs ?? state.lastLapTimeMs,
        sector1TimeMs: action.sector1TimeMs ?? state.sector1TimeMs,
        sector2TimeMs: action.sector2TimeMs ?? state.sector2TimeMs,
        lapDistance: action.lapDistance ?? state.lapDistance,
        totalDistance: action.totalDistance ?? state.totalDistance,
        carPosition: action.carPosition ?? state.carPosition,
        currentLapNum: action.currentLapNum ?? state.currentLapNum,
        pitStatus: action.pitStatus ?? state.pitStatus,
        sector: action.sector ?? state.sector,
        currentLapInvalid: action.currentLapInvalid ?? state.currentLapInvalid,
        numPitStops: action.numPitStops ?? state.numPitStops,
      }

    case 'damage':
      return { ...state,
        tyresWear: action.tyresWear ?? state.tyresWear,
        tyresDamage: action.tyresDamage ?? state.tyresDamage,
        tyresBlister: action.tyresBlister ?? state.tyresBlister,
        drsFault: action.drsFault ?? state.drsFault,
        ersFault: action.ersFault ?? state.ersFault,
        gearBoxDamage: action.gearBoxDamage ?? state.gearBoxDamage,
        engineDamage: action.engineDamage ?? state.engineDamage,
      }

    case 'session':
      return { ...state,
        trackId: action.trackId ?? state.trackId,
        trackName: action.trackName ?? state.trackName,
        sessionType: action.sessionType ?? state.sessionType,
        sessionTypeName: action.sessionTypeName ?? state.sessionTypeName,
        totalLaps: action.totalLaps ?? state.totalLaps,
        trackLength: action.trackLength ?? state.trackLength,
        sessionUID: String(action.sessionUID ?? state.sessionUID),
        weather: action.weather ?? state.weather,
        trackTemperature: action.trackTemperature ?? state.trackTemperature,
        airTemperature: action.airTemperature ?? state.airTemperature,
        steeringAssist: action.steeringAssist ?? state.steeringAssist,
        brakingAssist: action.brakingAssist ?? state.brakingAssist,
        brakingAssistLabel: action.brakingAssistLabel ?? state.brakingAssistLabel,
        gearboxAssist: action.gearboxAssist ?? state.gearboxAssist,
        gearboxAssistLabel: action.gearboxAssistLabel ?? state.gearboxAssistLabel,
        ersAssist: action.ersAssist ?? state.ersAssist,
        drsAssist: action.drsAssist ?? state.drsAssist,
        dynamicRacingLine: action.dynamicRacingLine ?? state.dynamicRacingLine,
        racingLineLabel: action.racingLineLabel ?? state.racingLineLabel,
      }

    case 'lap_complete':
      // Update best lap time and sector bests
      const newBest = (() => {
        const t = action.fuelCorrectedMs ?? action.lapTimeMs
        if (!t || !action.valid) return state.bestLapTimeMs
        return state.bestLapTimeMs ? Math.min(state.bestLapTimeMs, t) : t
      })()
      return { ...state,
        bestLapTimeMs: newBest,
        lastAnalysis: action,
      }

    case 'history':
      return { ...state,
        lapHistory: action.laps ?? state.lapHistory,
        sessionLaps: action.sessionLaps ?? state.sessionLaps,
        sessionBestMs: action.sessionBestMs ?? state.sessionBestMs,
        allTimeBestMs: action.allTimeBestMs ?? state.allTimeBestMs,
      }

    default:
      return state
  }
}

// ── Context ───────────────────────────────────────────────────────────────────
export const TelemetryContext = createContext(null)

export function TelemetryProvider({ children, onRadioMessage }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const radioRef = useRef(onRadioMessage)
  radioRef.current = onRadioMessage

  const handleMessage = useCallback((msg) => {
    dispatch(msg)
    if (msg.type === 'radio_message') {
      radioRef.current?.(msg)
    }
  }, [])

  return createElement(TelemetryContext.Provider, { value: { state, dispatch, handleMessage } }, children)
}

export function useTelemetry() {
  return useContext(TelemetryContext)
}
