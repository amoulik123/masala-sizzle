// Analysis thresholds that differ between wheel/pedals and controller
export const ANALYSIS_CONFIG = {
  wheel: {
    coastingThresholdSec: 0.3,
    brakeSmoothnessMaxStdDev: 0.05,
    lockupBrakeDrop: 0.10,
    wheelspinSpikes: 2,
    trailBrakingMinPressure: 0.05,
    throttleModulationExpected: true,
  },
  controller: {
    coastingThresholdSec: 0.5,
    brakeSmoothnessMaxStdDev: 0.10,
    lockupBrakeDrop: 0.20,
    wheelspinSpikes: 3,
    trailBrakingMinPressure: 0.05,
    throttleModulationExpected: false,
  },
}

// Tyre temperature windows by compound (surface temp °C)
export const TYRE_TEMP_WINDOWS = {
  soft:   { cold: 75,  optLow: 80,  optHigh: 100, hot: 105, critical: 110 },
  medium: { cold: 75,  optLow: 82,  optHigh: 105, hot: 108, critical: 115 },
  hard:   { cold: 80,  optLow: 85,  optHigh: 110, hot: 112, critical: 118 },
  inter:  { cold: 55,  optLow: 65,  optHigh: 85,  hot: 90,  critical: 95  },
  wet:    { cold: 45,  optLow: 55,  optHigh: 75,  hot: 80,  critical: 85  },
}

// Map visual tyre compound ID → window key
export const COMPOUND_WINDOW_KEY = {
  16: 'soft', 17: 'medium', 18: 'hard',
  7: 'inter', 8: 'wet',
}

export function getTyreWindow(visualCompoundId) {
  const key = COMPOUND_WINDOW_KEY[visualCompoundId] ?? 'medium'
  return TYRE_TEMP_WINDOWS[key]
}

export function tyreColour(temp, window) {
  if (!window) return '#888'
  if (temp < window.cold)     return '#42a5f5'  // blue — cold
  if (temp <= window.optHigh) return '#66bb6a'  // green — in window
  if (temp < window.critical) return '#ffa726'  // amber — hot
  return '#ef5350'                               // red — critical
}

// Full-throttle threshold — 0.98 not 1.0 (calibration rarely hits exact 1.0)
export const FULL_THROTTLE_THRESHOLD = 0.98
export const COASTING_THROTTLE_MAX = 0.02
export const FUEL_CORRECTION_PER_KG_S = 0.035  // seconds per kg
