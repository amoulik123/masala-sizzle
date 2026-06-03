const STYLE_LABELS = { flat: 'Flat', light: 'Light', medium: 'Medium', heavy: 'Heavy' }

export function CornerCard({ corner }) {
  const { name, style, entrySpeed, apexSpeed, exitSpeed, maxBrakePressure, brakingDistance, trailBraking, coaching } = corner

  return (
    <div className="corner-card">
      <div className="corner-card-header">
        <span className="corner-name">{name}</span>
        <span className={`corner-badge ${style ?? 'medium'}`}>{STYLE_LABELS[style] ?? style}</span>
      </div>
      <div className="corner-card-body">
        <div className="corner-stat">
          <div className="corner-stat-label">Entry</div>
          <div className="corner-stat-value">{Math.round(entrySpeed ?? 0)}</div>
        </div>
        <div className="corner-stat">
          <div className="corner-stat-label">Apex</div>
          <div className="corner-stat-value">{Math.round(apexSpeed ?? 0)}</div>
        </div>
        <div className="corner-stat">
          <div className="corner-stat-label">Exit</div>
          <div className="corner-stat-value">{Math.round(exitSpeed ?? 0)}</div>
        </div>
        <div className="corner-stat">
          <div className="corner-stat-label">Brake</div>
          <div className="corner-stat-value">{Math.round((maxBrakePressure ?? 0) * 100)}%</div>
        </div>
        <div className="corner-stat">
          <div className="corner-stat-label">Dist</div>
          <div className="corner-stat-value">{Math.round(brakingDistance ?? 0)}m</div>
        </div>
        <div className="corner-stat">
          <div className="corner-stat-label">Trail</div>
          <div className="corner-stat-value" style={{ color: trailBraking ? 'var(--delta-faster)' : 'var(--text-dim)' }}>
            {trailBraking ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
      {coaching && <div className="corner-coaching">{coaching}</div>}
    </div>
  )
}
