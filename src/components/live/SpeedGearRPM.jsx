import { useMemo } from 'react'
import { RevLightBar } from './RevLightBar'

function gearLabel(gear) {
  if (gear === -1) return 'R'
  if (gear === 0)  return 'N'
  return String(gear)
}
function gearClass(gear) {
  if (gear === -1) return 'reverse'
  if (gear === 0)  return 'neutral'
  if (gear >= 6)   return 'high'
  return ''
}

export function SpeedGearRPM({ speed, gear, rpm, maxRPM, idleRPM, revLightsBitValue }) {
  const rpmPct = maxRPM > idleRPM
    ? Math.min(100, ((rpm - idleRPM) / (maxRPM - idleRPM)) * 100)
    : 0
  const barClass = rpmPct > 92 ? 'redline' : rpmPct > 78 ? 'high' : ''

  return (
    <div className="panel">
      <div className="panel-body" style={{ paddingBottom: 8 }}>
        <div className="speed-block">
          <span className="speed-value">{Math.round(speed)}</span>
          <span className="speed-unit">km/h</span>
          <span className={`gear-badge ${gearClass(gear)}`}>{gearLabel(gear)}</span>
        </div>
        <div className="rpm-bar-container">
          <div className="rpm-bar-track">
            <div className={`rpm-bar-fill ${barClass}`} style={{ width: `${rpmPct}%` }} />
          </div>
          <div className="rpm-value">{rpm?.toLocaleString()} rpm</div>
        </div>
      </div>
      <RevLightBar revLightsBitValue={revLightsBitValue} />
    </div>
  )
}
