import { Sparkline } from '../evolution/Sparkline'
import { calcDegRate, projectedCliffLap } from '../../data/strategy'

export function TyreDegChart({ sessionLaps, currentLap, tyresAgeLaps }) {
  const wearHistory = (sessionLaps ?? [])
    .filter(l => l.tyresWear)
    .map(l => ({
      lapNum: l.lapNum,
      wearAvg: (l.tyresWear.reduce((a, b) => a + b, 0) / 4),
    }))

  if (wearHistory.length < 2) {
    return (
      <div className="panel">
        <div className="panel-header"><span className="panel-title">Tyre Degradation</span></div>
        <div style={{ padding: 12, fontSize: 11, color: 'var(--text-dim)' }}>Need 2+ laps for degradation model</div>
      </div>
    )
  }

  const degRate = calcDegRate(wearHistory) ?? 0
  const latestWear = wearHistory[wearHistory.length - 1].wearAvg
  const tyre = tyresAgeLaps ?? currentLap ?? 0
  const cliff = projectedCliffLap(latestWear, degRate, tyre)

  const wearData = wearHistory.map(l => l.wearAvg * 100)

  return (
    <div className="panel">
      <div className="panel-header"><span className="panel-title">Tyre Degradation</span></div>
      <div className="panel-body">
        <Sparkline data={wearData} width={280} height={50} color="var(--priority-warning)" />
        <div style={{ display: 'flex', gap: 16, marginTop: 8, fontFamily: 'var(--text-mono)', fontSize: 12 }}>
          <span>Current: <strong style={{ color: latestWear > 0.6 ? 'var(--brake)' : 'var(--text)' }}>
            {(latestWear * 100).toFixed(1)}%
          </strong></span>
          <span>Deg/lap: <strong>{(degRate * 100).toFixed(2)}%</strong></span>
          {cliff && <span>Cliff: <strong style={{ color: 'var(--priority-warning)' }}>~Lap {cliff}</strong></span>}
        </div>
      </div>
    </div>
  )
}
