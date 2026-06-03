import { Sparkline } from './Sparkline'

function fmtMs(ms) {
  if (!ms) return '--:--.---'
  const m = Math.floor(ms / 60000)
  const s = ((ms % 60000) / 1000).toFixed(3)
  return `${m}:${s.padStart(6,'0')}`
}

export function LapTimeChart({ sessionLaps, sessionBestMs }) {
  const valid = (sessionLaps ?? []).filter(l => l.valid && l.lapTimeMs)

  const fuelCorrected = valid.map(l => l.fuelCorrectedMs ?? l.lapTimeMs)
  const raw = valid.map(l => l.lapTimeMs)

  // Consistency = std dev of corrected times
  let consistency = null
  if (fuelCorrected.length > 2) {
    const mean = fuelCorrected.reduce((a,b) => a+b, 0) / fuelCorrected.length
    const variance = fuelCorrected.reduce((s,v) => s + (v-mean)**2, 0) / fuelCorrected.length
    consistency = (Math.sqrt(variance) / 1000).toFixed(3)
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Lap Times</span>
        {sessionBestMs && <span style={{ fontFamily: 'var(--text-mono)', fontSize: 11, color: 'var(--delta-purple)' }}>{fmtMs(sessionBestMs)}</span>}
      </div>
      <div className="panel-body">
        {valid.length < 2 ? (
          <div style={{ color: 'var(--text-dim)', fontSize: 12 }}>Need 2+ laps for chart</div>
        ) : (
          <>
            <Sparkline data={fuelCorrected} width={280} height={60} color="var(--delta-faster)" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'var(--text-dim)' }}>
              <span>Lap {valid[0].lapNum}</span>
              {consistency && <span>Consistency ±{consistency}s</span>}
              <span>Lap {valid[valid.length-1].lapNum}</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--text-mono)', fontSize: 11 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', color: 'var(--text-dim)', fontWeight: 600, padding: '2px 4px', borderBottom: '1px solid var(--border)' }}>Lap</th>
                    <th style={{ textAlign: 'right', color: 'var(--text-dim)', fontWeight: 600, padding: '2px 4px', borderBottom: '1px solid var(--border)' }}>Time</th>
                    <th style={{ textAlign: 'right', color: 'var(--text-dim)', fontWeight: 600, padding: '2px 4px', borderBottom: '1px solid var(--border)' }}>Corrected</th>
                  </tr>
                </thead>
                <tbody>
                  {valid.slice(-10).map((l, i) => (
                    <tr key={i}>
                      <td style={{ padding: '2px 4px', borderBottom: '1px solid var(--border)' }}>{l.lapNum}</td>
                      <td style={{ textAlign: 'right', padding: '2px 4px', borderBottom: '1px solid var(--border)', color: l.lapTimeMs === sessionBestMs ? 'var(--delta-purple)' : undefined }}>
                        {fmtMs(l.lapTimeMs)}
                      </td>
                      <td style={{ textAlign: 'right', padding: '2px 4px', borderBottom: '1px solid var(--border)', color: l.fuelCorrectedMs === Math.min(...fuelCorrected) ? 'var(--delta-faster)' : 'var(--text-dim)' }}>
                        {fmtMs(l.fuelCorrectedMs)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
