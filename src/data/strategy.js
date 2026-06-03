// Race strategy data per circuit
// pitLaneTimeLoss: seconds lost in pitlane (varies 19s Hungaroring to 26s Baku)
// pitWindow: optimal lap range for a 50-lap race equivalent (scaled by totalLaps)
// undercut/overcut: 'effective' | 'neutral' | 'ineffective'
// degRate: % wear per lap at representative pace
// cliffLap: approx lap number where compound hits the cliff in a typical stint

export const CIRCUIT_STRATEGY = {
  0:  { // Melbourne
    pitLaneTimeLoss: 23,
    pitWindow: { earliest: 13, optimal: 17, latest: 23 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 2.5, medium: 1.5, hard: 0.9 },
    cliffLap: { soft: 18, medium: 30, hard: 45 },
    safetyCarNote: 'High SC probability — street circuit style layout.',
  },
  2:  { // Shanghai
    pitLaneTimeLoss: 24,
    pitWindow: { earliest: 12, optimal: 16, latest: 22 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 2.8, medium: 1.6, hard: 1.0 },
    cliffLap: { soft: 17, medium: 28, hard: 42 },
    safetyCarNote: null,
  },
  3:  { // Sakhir / Bahrain
    pitLaneTimeLoss: 22,
    pitWindow: { earliest: 13, optimal: 17, latest: 23 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'very effective', overcut: 'ineffective',
    degRate: { soft: 3.0, medium: 1.8, hard: 1.1 },
    cliffLap: { soft: 16, medium: 26, hard: 40 },
    safetyCarNote: null,
  },
  4:  { // Catalunya / Barcelona
    pitLaneTimeLoss: 22,
    pitWindow: { earliest: 14, optimal: 19, latest: 25 },
    compounds: { oneStop: ['hard', 'hard'], twoStop: ['medium', 'medium', 'hard'] },
    undercut: 'neutral', overcut: 'neutral',
    degRate: { soft: 3.2, medium: 1.7, hard: 1.0 },
    cliffLap: { soft: 15, medium: 27, hard: 44 },
    safetyCarNote: null,
  },
  5:  { // Monaco
    pitLaneTimeLoss: 24,
    pitWindow: { earliest: 15, optimal: 20, latest: 30 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'ineffective', overcut: 'ineffective',
    degRate: { soft: 1.5, medium: 0.8, hard: 0.5 },
    cliffLap: { soft: 30, medium: 50, hard: 70 },
    safetyCarNote: 'Monaco: track position everything. Overcut almost impossible. Undercut useless — no overtaking.',
  },
  6:  { // Montreal
    pitLaneTimeLoss: 21,
    pitWindow: { earliest: 12, optimal: 16, latest: 22 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 2.8, medium: 1.6, hard: 1.0 },
    cliffLap: { soft: 17, medium: 28, hard: 42 },
    safetyCarNote: 'High SC probability. Wall of Champions catches many drivers.',
  },
  7:  { // Silverstone
    pitLaneTimeLoss: 22,
    pitWindow: { earliest: 13, optimal: 17, latest: 23 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 2.8, medium: 1.6, hard: 0.9 },
    cliffLap: { soft: 18, medium: 28, hard: 42 },
    safetyCarNote: null,
  },
  9:  { // Hungaroring
    pitLaneTimeLoss: 19,
    pitWindow: { earliest: 15, optimal: 20, latest: 28 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'very effective', overcut: 'ineffective',
    degRate: { soft: 2.5, medium: 1.5, hard: 0.9 },
    cliffLap: { soft: 20, medium: 32, hard: 48 },
    safetyCarNote: 'Very low SC probability.',
  },
  10: { // Spa
    pitLaneTimeLoss: 23,
    pitWindow: { earliest: 11, optimal: 15, latest: 20 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 2.2, medium: 1.3, hard: 0.8 },
    cliffLap: { soft: 20, medium: 35, hard: 50 },
    safetyCarNote: 'Unpredictable weather. Monitor forecasts carefully.',
  },
  11: { // Monza
    pitLaneTimeLoss: 23,
    pitWindow: { earliest: 12, optimal: 16, latest: 21 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'neutral', overcut: 'effective',
    degRate: { soft: 1.8, medium: 1.1, hard: 0.7 },
    cliffLap: { soft: 26, medium: 40, hard: 60 },
    safetyCarNote: null,
  },
  12: { // Singapore
    pitLaneTimeLoss: 25,
    pitWindow: { earliest: 13, optimal: 18, latest: 25 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'ineffective',
    degRate: { soft: 2.0, medium: 1.2, hard: 0.8 },
    cliffLap: { soft: 24, medium: 38, hard: 55 },
    safetyCarNote: 'Very high SC probability — street circuit. Nearly every race has a SC.',
  },
  13: { // Suzuka
    pitLaneTimeLoss: 22,
    pitWindow: { earliest: 13, optimal: 17, latest: 23 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'neutral', overcut: 'effective',
    degRate: { soft: 2.5, medium: 1.5, hard: 0.9 },
    cliffLap: { soft: 19, medium: 30, hard: 45 },
    safetyCarNote: null,
  },
  14: { // Abu Dhabi
    pitLaneTimeLoss: 22,
    pitWindow: { earliest: 13, optimal: 17, latest: 23 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 2.2, medium: 1.3, hard: 0.8 },
    cliffLap: { soft: 21, medium: 34, hard: 50 },
    safetyCarNote: null,
  },
  15: { // Austin / COTA
    pitLaneTimeLoss: 22,
    pitWindow: { earliest: 12, optimal: 16, latest: 22 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 2.9, medium: 1.7, hard: 1.0 },
    cliffLap: { soft: 17, medium: 27, hard: 40 },
    safetyCarNote: null,
  },
  16: { // Interlagos / Brazil
    pitLaneTimeLoss: 22,
    pitWindow: { earliest: 12, optimal: 16, latest: 22 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 2.8, medium: 1.6, hard: 1.0 },
    cliffLap: { soft: 18, medium: 28, hard: 42 },
    safetyCarNote: 'High SC probability. Unpredictable weather.',
  },
  17: { // Red Bull Ring / Austria
    pitLaneTimeLoss: 20,
    pitWindow: { earliest: 12, optimal: 16, latest: 22 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'very effective', overcut: 'neutral',
    degRate: { soft: 3.0, medium: 1.8, hard: 1.1 },
    cliffLap: { soft: 16, medium: 25, hard: 38 },
    safetyCarNote: null,
  },
  19: { // Mexico City
    pitLaneTimeLoss: 22,
    pitWindow: { earliest: 13, optimal: 17, latest: 23 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 1.8, medium: 1.1, hard: 0.7 },
    cliffLap: { soft: 26, medium: 42, hard: 60 },
    safetyCarNote: 'Low tyre deg at altitude. Hard compound viable for full stint.',
  },
  20: { // Baku
    pitLaneTimeLoss: 26,
    pitWindow: { earliest: 12, optimal: 16, latest: 22 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 2.0, medium: 1.2, hard: 0.8 },
    cliffLap: { soft: 23, medium: 37, hard: 55 },
    safetyCarNote: 'Very high SC probability. Safety car almost guaranteed.',
  },
  26: { // Zandvoort
    pitLaneTimeLoss: 21,
    pitWindow: { earliest: 13, optimal: 17, latest: 23 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'ineffective',
    degRate: { soft: 3.2, medium: 1.9, hard: 1.2 },
    cliffLap: { soft: 15, medium: 24, hard: 37 },
    safetyCarNote: null,
  },
  27: { // Imola
    pitLaneTimeLoss: 22,
    pitWindow: { earliest: 13, optimal: 17, latest: 23 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 2.5, medium: 1.5, hard: 0.9 },
    cliffLap: { soft: 19, medium: 30, hard: 45 },
    safetyCarNote: 'High SC probability. Gravel traps punish mistakes.',
  },
  29: { // Jeddah
    pitLaneTimeLoss: 24,
    pitWindow: { earliest: 11, optimal: 15, latest: 20 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 2.2, medium: 1.3, hard: 0.8 },
    cliffLap: { soft: 21, medium: 34, hard: 50 },
    safetyCarNote: 'High SC probability. Street circuit walls very close.',
  },
  30: { // Miami
    pitLaneTimeLoss: 23,
    pitWindow: { earliest: 13, optimal: 17, latest: 23 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 2.6, medium: 1.5, hard: 0.9 },
    cliffLap: { soft: 18, medium: 29, hard: 44 },
    safetyCarNote: null,
  },
  31: { // Las Vegas
    pitLaneTimeLoss: 23,
    pitWindow: { earliest: 13, optimal: 17, latest: 23 },
    compounds: { oneStop: ['medium', 'hard'], twoStop: ['soft', 'medium', 'medium'] },
    undercut: 'effective', overcut: 'neutral',
    degRate: { soft: 1.9, medium: 1.1, hard: 0.7 },
    cliffLap: { soft: 25, medium: 40, hard: 58 },
    safetyCarNote: null,
  },
  32: { // Losail / Qatar
    pitLaneTimeLoss: 22,
    pitWindow: { earliest: 14, optimal: 18, latest: 25 },
    compounds: { oneStop: ['hard', 'hard'], twoStop: ['medium', 'medium', 'hard'] },
    undercut: 'neutral', overcut: 'neutral',
    degRate: { soft: 3.5, medium: 2.0, hard: 1.3 },
    cliffLap: { soft: 13, medium: 22, hard: 35 },
    safetyCarNote: 'Very high deg circuit. Two-stop very common.',
  },
}

export const COMPOUND_NAMES = {
  16: 'Soft', 17: 'Medium', 18: 'Hard', 7: 'Inter', 8: 'Wet',
}

export const COMPOUND_COLOURS = {
  16: '#e8002d', 17: '#ffd700', 18: '#e8e8e8', 7: '#4caf50', 8: '#2196f3',
}

export function getStrategy(trackId) {
  return CIRCUIT_STRATEGY[trackId] ?? null
}

// Scale pit window from 50-lap reference to actual total laps
export function scaledPitWindow(strategy, totalLaps) {
  if (!strategy || !totalLaps) return null
  const factor = totalLaps / 50
  return {
    earliest: Math.max(1, Math.round(strategy.pitWindow.earliest * factor)),
    optimal:  Math.round(strategy.pitWindow.optimal * factor),
    latest:   Math.min(totalLaps - 3, Math.round(strategy.pitWindow.latest * factor)),
  }
}

// Live tyre degradation rate: linear regression over lap wear data
export function calcDegRate(lapWearHistory) {
  // lapWearHistory: [{lapNum, wearAvg}]
  if (!lapWearHistory || lapWearHistory.length < 2) return null
  const n = lapWearHistory.length
  const xs = lapWearHistory.map(l => l.lapNum)
  const ys = lapWearHistory.map(l => l.wearAvg)
  const mx = xs.reduce((a, b) => a + b) / n
  const my = ys.reduce((a, b) => a + b) / n
  const num = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0)
  const den = xs.reduce((s, x) => s + (x - mx) ** 2, 0)
  if (den === 0) return 0
  return num / den  // wear fraction per lap
}

// Project laps until cliff (wear >= 0.80 = 80%)
export function projectedCliffLap(currentWear, degRatePerLap, currentLap) {
  if (!degRatePerLap || degRatePerLap <= 0) return null
  const remainingWear = 0.80 - currentWear
  if (remainingWear <= 0) return currentLap
  return Math.round(currentLap + remainingWear / degRatePerLap)
}
