export function RaceInfoWidget({ state }) {
  const {
    carPosition, numPitStops, drs, drsAllowed,
    frontBrakeBias, pitStatus, weather, trackTemperature, airTemperature,
    safetyCarStatus, virtualSafetyCarStatus,
  } = state

  const drsOn = drs === 1
  const inPit = pitStatus === 1 || pitStatus === 2
  const scActive = safetyCarStatus === 1 || safetyCarStatus === 2
  const vscActive = virtualSafetyCarStatus === 1

  const WEATHER_LABELS = ['Dry', 'Light Cloud', 'Overcast', 'Light Rain', 'Heavy Rain', 'Storm']

  return (
    <div className="panel">
      <div className="panel-header"><span className="panel-title">Race Info</span></div>

      {(scActive || vscActive) && (
        <div className="sc-banner">
          {vscActive ? 'VIRTUAL SAFETY CAR' : 'SAFETY CAR DEPLOYED'}
        </div>
      )}

      <div className="panel-body">
        <div className="race-info-grid">
          <div className="race-info-cell">
            <div className="race-info-cell-label">Position</div>
            <div className={`race-info-cell-value ${carPosition === 1 ? 'pos-1' : ''}`}>P{carPosition ?? '—'}</div>
          </div>
          <div className="race-info-cell">
            <div className="race-info-cell-label">DRS</div>
            <div className={`race-info-cell-value ${drsOn ? 'drs-on' : 'drs-off'}`}>
              {drsOn ? 'OPEN' : drsAllowed ? 'AVAIL' : 'OFF'}
            </div>
          </div>
          <div className="race-info-cell">
            <div className="race-info-cell-label">Brake Bias</div>
            <div className="race-info-cell-value">{frontBrakeBias ?? 56}%</div>
          </div>
          <div className="race-info-cell">
            <div className="race-info-cell-label">Pit Stops</div>
            <div className="race-info-cell-value">{numPitStops ?? 0}{inPit ? ' 🟡' : ''}</div>
          </div>
          <div className="race-info-cell" style={{ gridColumn: '1/-1' }}>
            <div className="race-info-cell-label">Weather</div>
            <div className="race-info-cell-value" style={{ fontSize: 14 }}>
              {WEATHER_LABELS[weather ?? 0]} · Track {trackTemperature}° Air {airTemperature}°
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
