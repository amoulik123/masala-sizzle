import { getStrategy, scaledPitWindow } from '../../data/strategy'

const COMPOUND_COLORS = {
  soft: 'var(--compound-soft)', medium: 'var(--compound-medium)',
  hard: 'var(--compound-hard)', inter: 'var(--compound-inter)', wet: 'var(--compound-wet)',
}

export function PitWindow({ state }) {
  const { trackId, currentLapNum, totalLaps, sessionTypeName } = state
  const strategy = trackId >= 0 ? getStrategy(trackId) : null

  if (!strategy) {
    return (
      <div className="panel">
        <div className="panel-header"><span className="panel-title">Pit Window</span></div>
        <div style={{ padding: 12, fontSize: 11, color: 'var(--text-dim)' }}>Waiting for track data…</div>
      </div>
    )
  }

  const lap = currentLapNum ?? 0
  const total = totalLaps && totalLaps > 0 ? totalLaps : 50
  const window = scaledPitWindow(strategy, total) ?? strategy.pitWindow
  const isRace = sessionTypeName?.toLowerCase().includes('race')
  const inWindow = isRace && lap >= window.earliest && lap <= window.latest

  const strategies = [
    { label: 'One-stop', compounds: strategy.compounds?.oneStop ?? [], window },
    { label: 'Two-stop', compounds: strategy.compounds?.twoStop ?? [], window: null },
  ]

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Pit Window</span>
        <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{strategy.pitLaneTimeLoss}s loss</span>
      </div>
      <div style={{ padding: '6px 8px 4px', display: 'flex', gap: 16, fontSize: 11 }}>
        <span style={{ color: 'var(--text-dim)' }}>
          Undercut: <strong style={{ color: 'var(--text)' }}>{strategy.undercut}</strong>
        </span>
        <span style={{ color: 'var(--text-dim)' }}>
          Window: <strong style={{ fontFamily: 'var(--text-mono)', color: inWindow ? 'var(--delta-faster)' : 'var(--text)' }}>
            L{window.earliest}–{window.latest}
          </strong>
          {inWindow && <span style={{ color: 'var(--delta-faster)', fontWeight: 700 }}> ← NOW</span>}
        </span>
      </div>
      <div className="pit-window-list">
        {strategies.filter(s => s.compounds.length > 0).map((s, i) => (
          <div key={i} className={`pit-window-item ${i === 0 && inWindow ? 'recommended' : ''}`}>
            <div style={{ display: 'flex', gap: 3 }}>
              {s.compounds.map((c, j) => (
                <div key={j} className="pit-compound" style={{ background: COMPOUND_COLORS[c] ?? '#888' }} />
              ))}
            </div>
            <div className="pit-window-label">
              <strong>{s.label}</strong>
              <span style={{ color: 'var(--text-dim)', fontSize: 10, marginLeft: 6 }}>
                {s.compounds.join(' → ')}
              </span>
            </div>
            {i === 0 && window && (
              <div className="pit-window-laps">L{window.optimal}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
