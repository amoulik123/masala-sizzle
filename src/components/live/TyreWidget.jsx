import { TyreCorner } from './TyreCorner'

const COMPOUND_MAP = {
  16: 'soft', 17: 'medium', 18: 'hard',
  7: 'inter', 8: 'wet',
}

const CORNERS = ['FL', 'FR', 'RL', 'RR']

export function TyreWidget({ state }) {
  const compound = COMPOUND_MAP[state.actualTyreCompound] ?? 'medium'
  const {
    tyresSurfaceTemperature, tyresInnerTemperature,
    tyresWear, tyresBlister, visualTyreName, tyresAgeLaps
  } = state

  const compoundLabel = visualTyreName ?? 'Medium'
  const compoundClass = compound

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Tyres</span>
        <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>
          <span className={`tyre-compound-dot compound-${compoundClass}`} style={{
            display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
            background: `var(--compound-${compoundClass})`, marginRight: 4, verticalAlign: 'middle'
          }} />
          {compoundLabel} · Lap {tyresAgeLaps ?? 0}
        </span>
      </div>
      <div className="panel-body">
        <div className="tyre-widget">
          {CORNERS.map((corner, i) => (
            <TyreCorner
              key={corner}
              corner={corner}
              surface={tyresSurfaceTemperature?.[i] ?? 0}
              inner={tyresInnerTemperature?.[i] ?? 0}
              outer={tyresSurfaceTemperature?.[i] ?? 0}
              wear={tyresWear?.[i] ?? 0}
              blister={tyresBlister?.[i] ?? 0}
              compound={compound}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
