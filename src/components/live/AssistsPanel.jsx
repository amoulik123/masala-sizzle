const ASSISTS = [
  { key: 'tractionControl',  label: 'TC',         fmt: v => v === 0 ? 'Off' : v === 1 ? 'Medium' : 'Full' },
  { key: 'antiLockBrakes',   label: 'ABS',        fmt: v => v ? 'On' : 'Off' },
  { key: 'steeringAssist',   label: 'Steering',   fmt: v => v ? 'On' : 'Off' },
  { key: 'brakingAssist',    label: 'Braking',    fmt: (v, s) => s.brakingAssistLabel ?? (v ? 'On' : 'Off') },
  { key: 'gearboxAssist',    label: 'Gearbox',    fmt: (v, s) => s.gearboxAssistLabel ?? (v === 3 ? 'Auto' : v === 2 ? 'Suggest' : 'Manual') },
  { key: 'ersAssist',        label: 'ERS',        fmt: v => v ? 'Managed' : 'Manual' },
  { key: 'drsAssist',        label: 'DRS',        fmt: v => v ? 'Auto' : 'Manual' },
  { key: 'dynamicRacingLine', label: 'Racing Line', fmt: (v, s) => s.racingLineLabel ?? (v === 0 ? 'Off' : v === 1 ? 'Corners' : 'Full') },
]

function isAssistOn(key, value) {
  if (key === 'gearboxAssist') return value === 3 || value === 2
  if (key === 'dynamicRacingLine') return value > 0
  return value > 0
}

export function AssistsPanel({ state }) {
  return (
    <div className="panel">
      <div className="panel-header"><span className="panel-title">Assists</span></div>
      <div className="assists-grid">
        {ASSISTS.map(({ key, label, fmt }) => {
          const val = state[key] ?? 0
          const on = isAssistOn(key, val)
          return (
            <div key={key} className={`assist-chip ${on ? 'on' : 'off'}`}>
              <div className="assist-chip-name">{label}</div>
              <div className="assist-chip-value">{fmt(val, state)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
