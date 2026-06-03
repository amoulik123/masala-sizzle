import { Sparkline } from './Sparkline'

export function CornerEvolution({ sessionLaps }) {
  const laps = (sessionLaps ?? []).filter(l => l.analysis?.corners?.length > 0)
  if (laps.length < 3) {
    return (
      <div className="panel">
        <div className="panel-header"><span className="panel-title">Corner Evolution</span></div>
        <div className="empty-state" style={{ padding: '20px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>Need 3+ laps for corner trend data</div>
        </div>
      </div>
    )
  }

  // Collect all unique corner names
  const cornerNames = [...new Set(laps.flatMap(l => l.analysis.corners.map(c => c.name)))]

  return (
    <div className="panel">
      <div className="panel-header"><span className="panel-title">Corner Evolution</span></div>
      <div className="panel-body">
        {cornerNames.slice(0, 8).map(name => {
          const apexSpeeds = laps.map(l => l.analysis.corners.find(c => c.name === name)?.apexSpeed).filter(Boolean)
          if (apexSpeeds.length < 2) return null
          const earliest = apexSpeeds[0]?.toFixed(0)
          const latest   = apexSpeeds[apexSpeeds.length-1]?.toFixed(0)
          const trend = apexSpeeds[apexSpeeds.length-1] - apexSpeeds[0]
          const trendColor = trend > 1 ? 'var(--delta-faster)' : trend < -1 ? 'var(--delta-slower)' : 'var(--text-dim)'

          return (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ width: 120, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{name}</span>
              <Sparkline data={apexSpeeds} width={80} height={28} color={trendColor} />
              <div style={{ fontFamily: 'var(--text-mono)', fontSize: 11 }}>
                <span style={{ color: 'var(--text-dim)' }}>{earliest}→</span>
                <span style={{ color: trendColor }}>{latest}</span>
                <span style={{ color: 'var(--text-dim)', fontSize: 10 }}> km/h</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
