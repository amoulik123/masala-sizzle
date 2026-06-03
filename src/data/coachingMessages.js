// Coaching message templates — differ by input mode (wheel vs controller)
export const COACHING = {
  trail_brake: {
    wheel: 'Carry brake pressure into the corner and taper it smoothly as you add steering.',
    controller: 'Release your brake trigger gradually as you turn in — aim for 70%, 50%, 30%, off.',
  },
  brake_too_early: {
    wheel: "Brake later here — you're leaving time in the entry.",
    controller: 'You can brake later here. Push the braking point closer to the corner.',
  },
  brake_modulate: {
    wheel: 'Sharp peak pressure, then a smooth gradient to release. No sawing.',
    controller: 'Firm trigger at entry, then ease off — avoid letting go all at once.',
  },
  throttle_overlap: {
    wheel: 'Simultaneous throttle and brake detected — check pedal calibration or technique.',
    controller: "Trigger overlap detected — make sure you're fully off brake before throttle.",
  },
  smooth_throttle: {
    wheel: 'Pick up throttle at 15-20% early. Build smoothly to full.',
    controller: 'Get back on throttle early but gently. Avoid snapping to full while still turning.',
  },
  wheelspin: {
    wheel: 'Wheelspin at exit — more progressive throttle application.',
    controller: "Wheelspin — don't snap the trigger to full while the wheel is still turned.",
  },
  flat_corner: {
    wheel: 'This corner should be flat. Trust the downforce and commit.',
    controller: 'This corner should be flat. Hold the trigger and commit through.',
  },
  apex_speed_low: {
    wheel: (name, gap, ref) => `${name}: ${gap} km/h off apex reference (${ref} km/h). Carry more speed through.`,
    controller: (name, gap, ref) => `${name}: ${gap} km/h off apex reference (${ref} km/h). Carry more speed through.`,
  },
  slow_exit: {
    wheel: (name) => `${name}: Slow exit. More rotation mid-corner or earlier throttle pickup.`,
    controller: (name) => `${name}: Slow exit. Try to get on throttle slightly earlier.`,
  },
  lockups: {
    wheel: (count) => `${count} lockups. Reduce front brake bias 1% or brake fractionally earlier.`,
    controller: (count) => `${count} lockups. Use a slightly less aggressive brake input at entry.`,
  },
  coasting_high: {
    wheel: 'Coasting percentage high — check for early braking leaving a gap before the zone.',
    controller: 'Coasting high — try to close the gap between letting off throttle and braking.',
  },
  tyre_cold: (corner) => `${corner} tyre cold — generating no grip. Warm them up before pushing.`,
  tyre_critical: (corner) => `${corner} tyre critical temperature — blistering risk. Back off.`,
  fuel_lean: 'Running lean — consider short-shifting to conserve fuel.',
  fuel_rich: 'Plenty of fuel — no need to conserve.',
  ers_low: 'ERS critically low. Switch to harvest mode.',
  ers_full: 'ERS store full — you are wasting harvest. Deploy more.',
  lap_complete_best: (t) => `New best lap: ${t}. Clean work.`,
  lap_complete_delta: (t, d) => `Lap: ${t}, ${d >= 0 ? '+' : ''}${(d/1000).toFixed(3)}s.`,
}

export function getCoaching(key, mode = 'wheel') {
  const entry = COACHING[key]
  if (!entry) return ''
  if (typeof entry === 'object' && (entry.wheel || entry.controller)) {
    return entry[mode] ?? entry.wheel ?? ''
  }
  if (typeof entry === 'function') return entry
  return entry
}
