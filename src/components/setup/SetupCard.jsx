export function SetupCard({ title, params, baseline }) {
  return (
    <div className="panel setup-card">
      <div className="panel-header"><span className="panel-title">{title}</span></div>
      <div>
        {params.map(({ key, label, value, unit, delta }) => {
          const deltaCls = delta > 0 ? 'up' : delta < 0 ? 'down' : null
          return (
            <div key={key} className="setup-param-row">
              <span className="setup-param-name">{label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {delta != null && deltaCls && (
                  <span className={`setup-delta-badge ${deltaCls}`}>
                    {delta > 0 ? '+' : ''}{delta}
                  </span>
                )}
                <span className="setup-param-value">
                  {value != null ? value : '—'}
                  {unit ? <span style={{ fontSize: 10, color: 'var(--text-dim)', marginLeft: 2 }}>{unit}</span> : null}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
