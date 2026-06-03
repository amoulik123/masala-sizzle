import { StatusDot } from '../shared/StatusDot'

const TABS = ['Live', 'Analysis', 'Evolution', 'Setup', 'Strategy']

export function Header({ activeTab, setActiveTab, wsStatus, inputMode, setInputMode, trackName, sessionTypeName }) {
  const subtitle = trackName && trackName !== 'Unknown' ? `${trackName} · ${sessionTypeName}` : 'Waiting…'
  return (
    <header className="header">
      <span className="header-brand">F1 25</span>
      <span style={{ fontSize: 11, color: 'var(--text-dim)', marginRight: 4 }}>{subtitle}</span>
      <nav className="header-tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`tab-btn ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </nav>
      <div className="header-right">
        <div className="input-toggle-group">
          <button
            className={`input-toggle ${inputMode === 'wheel' ? 'active' : ''}`}
            onClick={() => setInputMode('wheel')}
          >
            Wheel
          </button>
          <button
            className={`input-toggle ${inputMode === 'controller' ? 'active' : ''}`}
            onClick={() => setInputMode('controller')}
          >
            Ctrl
          </button>
        </div>
        <StatusDot status={wsStatus} />
      </div>
    </header>
  )
}
