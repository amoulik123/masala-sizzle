export function FuelWidget({ fuelInTank, fuelCapacity, fuelRemainingLaps }) {
  const kg = (fuelInTank ?? 0).toFixed(1)
  const laps = (fuelRemainingLaps ?? 0).toFixed(1)
  const pct = fuelCapacity > 0 ? Math.min(100, (fuelInTank / fuelCapacity) * 100) : 0
  const lapsCls = fuelRemainingLaps < 1.5 ? 'critical' : fuelRemainingLaps < 3 ? 'warning' : 'ok'

  return (
    <div className="panel">
      <div className="panel-header"><span className="panel-title">Fuel</span></div>
      <div className="panel-body">
        <div className="fuel-row">
          <span className="fuel-kg">{kg}<span className="fuel-kg-unit"> kg</span></span>
          <span className={`fuel-laps ${lapsCls}`}>{laps}<span className="fuel-laps-unit"> laps</span></span>
        </div>
        <div className="fuel-bar-track">
          <div className="fuel-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}
