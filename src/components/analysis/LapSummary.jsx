import { Delta } from '../shared/Delta'

function fmtMs(ms) {
  if (!ms) return '--:--.---'
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  const ms3 = ms % 1000
  return `${m}:${String(s).padStart(2,'0')}.${String(ms3).padStart(3,'0')}`
}

export function LapSummary({ analysis, bestLapTimeMs }) {
  if (!analysis) return null
  const { lapNum, lapTimeMs, fuelCorrectedMs, valid, analysis: a } = analysis

  return (
    <div className="lap-summary">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600 }}>
          LAP {lapNum} {!valid && <span style={{ color: 'var(--brake)' }}>(INVALID)</span>}
        </span>
        <div style={{ display: 'flex', gap: 12, fontFamily: 'var(--text-mono)', fontSize: 13 }}>
          <span>{fmtMs(lapTimeMs)}</span>
          {fuelCorrectedMs && fuelCorrectedMs !== lapTimeMs && (
            <span style={{ color: 'var(--text-dim)' }}>{fmtMs(fuelCorrectedMs)} (corrected)</span>
          )}
          {bestLapTimeMs && lapTimeMs && (
            <Delta ms={lapTimeMs - bestLapTimeMs} />
          )}
        </div>
      </div>

      <div className="lap-summary-verdict">{a?.verdict ?? '—'}</div>

      {a?.stats && (
        <div className="lap-summary-stats">
          <span>Full throttle: <span>{a.stats.fullThrottlePct?.toFixed(1)}%</span></span>
          <span>Coasting: <span>{a.stats.coastingPct?.toFixed(1)}%</span></span>
          <span>Lockups: <span style={{ color: a.stats.lockupCount > 0 ? 'var(--priority-warning)' : undefined }}>{a.stats.lockupCount}</span></span>
          <span>Trail braking: <span>{a.stats.trailBrakingPct?.toFixed(1)}%</span></span>
          {a.stats.avgBrakingDistance != null && (
            <span>Avg brake dist: <span>{Math.round(a.stats.avgBrakingDistance)}m</span></span>
          )}
        </div>
      )}
    </div>
  )
}
