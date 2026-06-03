export function PedalGauges({ throttle, brake, steer }) {
  const throttlePct = Math.round((throttle ?? 0) * 100)
  const brakePct    = Math.round((brake ?? 0) * 100)
  const steerNorm   = steer ?? 0  // -1..+1
  const steerPct    = Math.abs(steerNorm) * 50
  const steerLeft   = steerNorm < 0 ? `${50 - steerPct}%` : '50%'

  return (
    <div className="panel">
      <div className="panel-header"><span className="panel-title">Inputs</span></div>
      <div className="panel-body">
        <div className="pedal-gauges">
          <div className="pedal-gauge">
            <div className="pedal-gauge-track">
              <div className="pedal-gauge-fill throttle" style={{ height: `${throttlePct}%` }} />
            </div>
            <span className="pedal-gauge-label">Thr</span>
            <span className="pedal-gauge-value">{throttlePct}%</span>
          </div>
          <div className="pedal-gauge">
            <div className="pedal-gauge-track">
              <div className="pedal-gauge-fill brake" style={{ height: `${brakePct}%` }} />
            </div>
            <span className="pedal-gauge-label">Brk</span>
            <span className="pedal-gauge-value">{brakePct}%</span>
          </div>
          <div className="steer-bar" style={{ justifyContent: 'flex-end', paddingBottom: 20 }}>
            <div className="steer-track" style={{ width: '100%', height: 16, margin: 'auto 0' }}>
              <div className="steer-center" />
              <div className="steer-fill" style={{ left: steerLeft, width: `${steerPct}%` }} />
            </div>
            <span className="steer-label" style={{ marginTop: 4 }}>Steer</span>
            <span className="steer-value">{(steerNorm * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
