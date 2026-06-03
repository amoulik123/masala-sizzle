import { LapSummary } from './LapSummary'
import { CornerCard } from './CornerCard'
import { CopyButton } from './CopyButton'

export function PostLapAnalysis({ lastAnalysis, bestLapTimeMs }) {
  if (!lastAnalysis) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🏁</div>
        <div className="empty-state-title">No Lap Data Yet</div>
        <div className="empty-state-sub">Complete a lap to see the post-lap analysis.<br />Make sure telemetry is connected.</div>
      </div>
    )
  }

  const top3 = lastAnalysis.analysis?.top3 ?? []
  const corners = lastAnalysis.analysis?.corners ?? []

  return (
    <div>
      <div className="panel" style={{ marginBottom: 8 }}>
        <div className="panel-header">
          <span className="panel-title">Lap Analysis</span>
          <CopyButton analysis={lastAnalysis} />
        </div>
        <LapSummary analysis={lastAnalysis} bestLapTimeMs={bestLapTimeMs} />

        {top3.length > 0 && (
          <div className="improvements-list">
            <div className="improvements-title">Top Improvements</div>
            {top3.map((item, i) => (
              <div key={i} className={`improvement-item priority-${i+1}`}>
                <span className="improvement-rank">#{i+1}</span>
                <div>
                  <strong style={{ fontSize: 11, color: 'var(--text)', display: 'block', marginBottom: 2 }}>{item.corner}</strong>
                  {item.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {corners.length > 0 && (
        <div className="panel">
          <div className="panel-header"><span className="panel-title">Corner Breakdown</span></div>
          <div className="corner-cards">
            {corners.map((c, i) => <CornerCard key={i} corner={c} />)}
          </div>
        </div>
      )}
    </div>
  )
}
