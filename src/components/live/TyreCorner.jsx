import { TYRE_TEMP_WINDOWS } from '../../data/analysisConfig'

function tempClass(temp, compound) {
  const win = TYRE_TEMP_WINDOWS[compound] ?? TYRE_TEMP_WINDOWS.medium
  if (temp >= win.critical) return 'critical'
  if (temp >= win.hot)      return 'hot'
  if (temp >= win.optLow)   return 'ok'
  return 'cold'
}

const LABELS = { FL: 'Front Left', FR: 'Front Right', RL: 'Rear Left', RR: 'Rear Right' }

export function TyreCorner({ corner, inner, outer, surface, wear, blister, compound }) {
  const innerCls   = tempClass(inner, compound)
  const surfaceCls = tempClass(surface, compound)
  const outerCls   = tempClass(outer ?? surface, compound)
  const wearPct    = Math.round((wear ?? 0) * 100)

  return (
    <div className="tyre-corner">
      <span className="tyre-corner-label">{corner}</span>
      <div className="tyre-corner-temps">
        <div className={`tyre-temp-zone ${outerCls}`}>{Math.round(outer ?? surface)}°</div>
        <div className={`tyre-temp-zone ${surfaceCls}`}>{Math.round(surface)}°</div>
        <div className={`tyre-temp-zone ${innerCls}`}>{Math.round(inner)}°</div>
      </div>
      <div className="tyre-corner-stats">
        <span className={`tyre-wear ${wearPct > 70 ? 'tyre-critical' : ''}`}>{wearPct}%</span>
        {blister > 0 && <span className="tyre-blister">B{blister}</span>}
      </div>
    </div>
  )
}
