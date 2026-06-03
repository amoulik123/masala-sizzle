import { LapTimeChart } from './LapTimeChart'
import { CornerEvolution } from './CornerEvolution'
import { WearPatterns } from './WearPatterns'

export function EvolutionDashboard({ state }) {
  const { sessionLaps, sessionBestMs, allTimeBestMs, trackName } = state

  return (
    <div>
      {trackName && trackName !== 'Unknown' && (
        <div style={{ marginBottom: 8, fontSize: 12, color: 'var(--text-dim)' }}>
          {trackName} · {(sessionLaps ?? []).filter(l => l.valid).length} valid laps
          {allTimeBestMs && (
            <span style={{ marginLeft: 12, color: 'var(--delta-purple)', fontFamily: 'var(--text-mono)' }}>
              All-time best: {(() => {
                const m = Math.floor(allTimeBestMs / 60000)
                const s = ((allTimeBestMs % 60000) / 1000).toFixed(3)
                return `${m}:${s.padStart(6,'0')}`
              })()}
            </span>
          )}
        </div>
      )}
      <div className="evolution-grid">
        <LapTimeChart sessionLaps={sessionLaps} sessionBestMs={sessionBestMs} />
        <WearPatterns sessionLaps={sessionLaps} />
        <CornerEvolution sessionLaps={sessionLaps} />
      </div>
    </div>
  )
}
