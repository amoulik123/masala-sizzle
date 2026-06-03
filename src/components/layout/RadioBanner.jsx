import { useTelemetry } from '../../hooks/useTelemetry'

const ICONS = { info: '📻', warning: '⚠️', critical: '🚨' }

export function RadioBanner({ banner, log, muted, toggleMute }) {
  return (
    <>
      <div className={`radio-banner ${banner?.priority ?? 'info'} ${banner ? 'visible' : ''}`}>
        <span className="radio-banner-icon">{ICONS[banner?.priority ?? 'info']}</span>
        <span className="radio-banner-text">{banner?.message}</span>
        <span className="radio-banner-ts">{banner?.ts}</span>
      </div>

      <div className="radio-panel">
        <div className="radio-panel-header">
          <span className="radio-panel-title">Radio</span>
          <button className={`mute-btn ${muted ? 'muted' : ''}`} onClick={toggleMute}>
            {muted ? 'Unmute' : 'Mute'}
          </button>
        </div>
        <div className="radio-log">
          {log.length === 0 ? (
            <div style={{ padding: '12px', color: 'var(--text-dim)', fontSize: 12, textAlign: 'center' }}>
              Waiting for telemetry…
            </div>
          ) : log.map((entry, i) => (
            <div key={i} className={`radio-log-entry ${entry.priority}`}>
              <span className="radio-log-ts">{entry.ts}</span>
              <span className="radio-log-msg">{entry.message}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
