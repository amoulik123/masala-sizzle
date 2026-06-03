import { SetupCard } from './SetupCard'
import { getSetup, SETUP_ADVISOR_RULES } from '../../data/setups'

function deriveRules(state, setup, inputMode) {
  const rules = []
  const { tyresWear, tyresBlister, tyresPressure, frontBrakeBias, sessionLaps } = state

  for (const rule of SETUP_ADVISOR_RULES) {
    if (rule.condition(state, setup, inputMode)) {
      rules.push(rule)
    }
  }
  return rules.slice(0, 4)
}

export function SetupAdvisor({ state, inputMode }) {
  const trackId = state.trackId
  const setup = trackId >= 0 ? getSetup(trackId) : null

  if (!setup) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">⚙️</div>
        <div className="empty-state-title">No Setup Data</div>
        <div className="empty-state-sub">Setup advisor activates once a track is detected.</div>
      </div>
    )
  }

  const activeRules = deriveRules(state, setup, inputMode)

  const aeroParams = [
    { key: 'frontWing', label: 'Front Wing', value: setup.frontWing },
    { key: 'rearWing', label: 'Rear Wing', value: setup.rearWing },
  ]
  const suspParams = [
    { key: 'frontSuspension', label: 'Front Suspension', value: setup.frontSuspension },
    { key: 'rearSuspension', label: 'Rear Suspension', value: setup.rearSuspension },
    { key: 'frontARB', label: 'Front ARB', value: setup.frontAntiRollBar },
    { key: 'rearARB', label: 'Rear ARB', value: setup.rearAntiRollBar },
    { key: 'frontRideHeight', label: 'Front Ride Height', value: setup.frontRideHeight },
    { key: 'rearRideHeight', label: 'Rear Ride Height', value: setup.rearRideHeight },
  ]
  const brakeParams = [
    { key: 'brakePressure', label: 'Brake Pressure', value: setup.brakePressure, unit: '%' },
    { key: 'frontBrakeBias', label: 'Brake Bias', value: setup.frontBrakeBias, unit: '%' },
  ]
  const diffParams = [
    { key: 'onThrottleDiff', label: 'On-Throttle Diff', value: setup.onThrottleDiff, unit: '%' },
    { key: 'offThrottleDiff', label: 'Off-Throttle Diff', value: setup.offThrottleDiff, unit: '%' },
  ]
  const tyreParams = [
    { key: 'frontLeftTyrePressure', label: 'FL Pressure', value: setup.frontLeftTyrePressure, unit: 'psi' },
    { key: 'frontRightTyrePressure', label: 'FR Pressure', value: setup.frontRightTyrePressure, unit: 'psi' },
    { key: 'rearLeftTyrePressure', label: 'RL Pressure', value: setup.rearLeftTyrePressure, unit: 'psi' },
    { key: 'rearRightTyrePressure', label: 'RR Pressure', value: setup.rearRightTyrePressure, unit: 'psi' },
    { key: 'frontCamber', label: 'Front Camber', value: setup.frontCamber },
    { key: 'rearCamber', label: 'Rear Camber', value: setup.rearCamber },
    { key: 'frontToe', label: 'Front Toe', value: setup.frontToe },
    { key: 'rearToe', label: 'Rear Toe', value: setup.rearToe },
  ]

  return (
    <div>
      <div style={{ marginBottom: 8, fontSize: 12, color: 'var(--text-dim)' }}>
        {state.trackName} baseline setup
        <span style={{ marginLeft: 8, fontSize: 11 }}>Input: <strong style={{ color: 'var(--text)' }}>{inputMode}</strong></span>
      </div>

      {activeRules.length > 0 && (
        <div className="panel" style={{ marginBottom: 8 }}>
          <div className="panel-header"><span className="panel-title">Live Suggestions</span></div>
          <div className="setup-rules">
            {activeRules.map((r, i) => (
              <div key={i} className="setup-rule">
                <strong>{r.title}</strong>
                <span>{r.suggestion(state, setup, inputMode)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="setup-grid">
        <SetupCard title="Aerodynamics" params={aeroParams} />
        <SetupCard title="Brakes & Diff" params={[...brakeParams, ...diffParams]} />
        <SetupCard title="Suspension" params={suspParams} />
        <SetupCard title="Tyres" params={tyreParams} />
      </div>
    </div>
  )
}
