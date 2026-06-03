export function ERSFuelWarning({ state }) {
  const { ersStorePercent, fuelRemainingLaps, fuelInTank, totalLaps, currentLapNum } = state

  const lapsLeft = totalLaps && currentLapNum ? totalLaps - currentLapNum : null
  const fuelStatus = fuelRemainingLaps < 1.5 ? 'critical' : fuelRemainingLaps < 3 ? 'warning' : 'ok'
  const ersStatus = ersStorePercent < 5 ? 'critical' : ersStorePercent < 20 ? 'warning' : 'ok'

  return (
    <div className="panel">
      <div className="panel-header"><span className="panel-title">ERS & Fuel</span></div>
      <div className="ers-fuel-warning">
        <div className="ers-fuel-row">
          <span className="ers-fuel-label">ERS Store</span>
          <span className={`ers-fuel-value ${ersStatus}`}>{Math.round(ersStorePercent ?? 0)}%</span>
        </div>
        <div className="ers-fuel-row">
          <span className="ers-fuel-label">Fuel Remaining</span>
          <span className={`ers-fuel-value ${fuelStatus}`}>{(fuelInTank ?? 0).toFixed(1)} kg</span>
        </div>
        <div className="ers-fuel-row">
          <span className="ers-fuel-label">Fuel Laps</span>
          <span className={`ers-fuel-value ${fuelStatus}`}>{(fuelRemainingLaps ?? 0).toFixed(1)} laps</span>
        </div>
        {lapsLeft != null && (
          <div className="ers-fuel-row">
            <span className="ers-fuel-label">Laps Left</span>
            <span className="ers-fuel-value ok">{lapsLeft}</span>
          </div>
        )}
        {fuelStatus !== 'ok' && (
          <div style={{ marginTop: 8, padding: '6px 0', fontSize: 11, color: 'var(--priority-warning)', borderTop: '1px solid var(--border)' }}>
            {fuelStatus === 'critical' ? '⚠️ Fuel critical — lift and coast immediately' : '⚠️ Fuel low — manage fuel use this lap'}
          </div>
        )}
      </div>
    </div>
  )
}
