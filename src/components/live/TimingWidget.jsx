import { Delta } from '../shared/Delta'

function fmtMs(ms) {
  if (!ms) return '--:--.---'
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  const ms3 = ms % 1000
  return `${m}:${String(s).padStart(2,'0')}.${String(ms3).padStart(3,'0')}`
}

function sectorCls(ms, best) {
  if (!best || !ms) return ''
  const diff = ms - best
  if (diff < 0) return 'purple'
  if (diff === 0) return 'faster'
  return diff < 300 ? 'faster' : 'slower'
}

export function TimingWidget({ state }) {
  const {
    currentLapTimeMs, lastLapTimeMs, bestLapTimeMs, sessionBestMs,
    sector1TimeMs, sector2TimeMs, bestSectors, currentLapInvalid,
    currentLapNum, totalLaps,
  } = state

  const lapCls = currentLapInvalid ? 'invalid' : ''

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Timing</span>
        <span style={{ fontFamily: 'var(--text-mono)', fontSize: 11, color: 'var(--text-dim)' }}>
          Lap {currentLapNum ?? '—'}{totalLaps ? ` / ${totalLaps}` : ''}
        </span>
      </div>
      <div className="panel-body">
        <div className="timing-widget">
          <div className="timing-row">
            <span className="timing-label">Now</span>
            <span className={`timing-value ${lapCls}`}>{fmtMs(currentLapTimeMs)}</span>
          </div>
          <div className="timing-row">
            <span className="timing-label">Last</span>
            <span className="timing-value sm">
              {fmtMs(lastLapTimeMs)}
              {bestLapTimeMs && lastLapTimeMs ? (
                <Delta ms={lastLapTimeMs - bestLapTimeMs} />
              ) : null}
            </span>
          </div>
          <div className="timing-row">
            <span className="timing-label">Best</span>
            <span className="timing-value best">{fmtMs(bestLapTimeMs)}</span>
          </div>
          {sessionBestMs && sessionBestMs !== bestLapTimeMs && (
            <div className="timing-row">
              <span className="timing-label">Sess.</span>
              <span className="timing-value sm">{fmtMs(sessionBestMs)}</span>
            </div>
          )}
        </div>

        <div className="sector-row">
          {[sector1TimeMs, sector2TimeMs].map((ms, i) => {
            const best = bestSectors?.[i]
            return (
              <div key={i} className="sector-chip">
                <span className="sector-chip-label">S{i+1}</span>
                <span className={`sector-chip-value ${sectorCls(ms, best)}`}>
                  {ms ? (ms / 1000).toFixed(3) : '--'}
                </span>
              </div>
            )
          })}
          <div className="sector-chip">
            <span className="sector-chip-label">S3</span>
            <span className="sector-chip-value">—</span>
          </div>
        </div>
      </div>
    </div>
  )
}
