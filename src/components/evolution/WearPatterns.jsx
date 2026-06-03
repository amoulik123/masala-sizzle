import { Sparkline } from './Sparkline'

const CORNERS = ['FL', 'FR', 'RL', 'RR']

export function WearPatterns({ sessionLaps }) {
  const laps = (sessionLaps ?? []).filter(l => l.tyresWear)
  if (laps.length < 2) {
    return (
      <div className="panel">
        <div className="panel-header"><span className="panel-title">Tyre Wear</span></div>
        <div className="empty-state" style={{ padding: '20px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>Need 2+ laps for wear data</div>
        </div>
      </div>
    )
  }

  // Average front vs rear wear per lap
  const frontWear = laps.map(l => ((l.tyresWear[0] + l.tyresWear[1]) / 2) * 100)
  const rearWear  = laps.map(l => ((l.tyresWear[2] + l.tyresWear[3]) / 2) * 100)
  const blistFreq = laps.filter(l => l.tyresBlister?.some(b => b > 10)).length

  return (
    <div className="panel">
      <div className="panel-header"><span className="panel-title">Tyre Wear</span></div>
      <div className="panel-body">
        <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Front Wear %</div>
            <Sparkline data={frontWear} width={120} height={40} color="var(--steer)" />
          </div>
          <div>
            <div style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Rear Wear %</div>
            <Sparkline data={rearWear} width={120} height={40} color="var(--priority-warning)" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {CORNERS.map((c, i) => {
            const vals = laps.map(l => (l.tyresWear[i] ?? 0) * 100)
            const latest = vals[vals.length - 1]
            return (
              <div key={c} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '3px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--text-mono)' }}>{c}</span>
                <span style={{
                  fontFamily: 'var(--text-mono)',
                  color: latest > 70 ? 'var(--brake)' : latest > 50 ? 'var(--priority-warning)' : 'var(--delta-faster)'
                }}>
                  {latest.toFixed(1)}%
                </span>
              </div>
            )
          })}
        </div>

        {blistFreq > 0 && (
          <div style={{ marginTop: 8, fontSize: 11, color: 'var(--priority-warning)' }}>
            Blistering detected on {blistFreq} lap{blistFreq > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  )
}
