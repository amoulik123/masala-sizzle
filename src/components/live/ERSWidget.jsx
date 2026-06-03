const MODE_LABELS = { 0: 'None', 1: 'Medium', 2: 'Hotlap', 3: 'Overtake' }
const MODE_CLASSES = { 0: '', 1: '', 2: 'hotlap', 3: 'overtake' }

export function ERSWidget({ ersStorePercent, ersDeplMode, ersDeplModeName, ersFault }) {
  const pct = Math.round(ersStorePercent ?? 0)
  const modeLabel = ersDeplModeName ?? MODE_LABELS[ersDeplMode] ?? 'None'
  const modeCls = MODE_CLASSES[ersDeplMode] ?? ''

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">ERS</span>
        {ersFault && <span style={{ fontSize: 10, color: 'var(--brake)', fontWeight: 700 }}>FAULT</span>}
      </div>
      <div className="panel-body">
        <div className="ers-bar-track">
          <div
            className={`ers-bar-fill ${pct < 15 ? 'low' : ''}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="ers-row">
          <span className="ers-pct">{pct}%</span>
          <span className={`ers-mode-badge ${modeCls}`}>{modeLabel}</span>
        </div>
      </div>
    </div>
  )
}
