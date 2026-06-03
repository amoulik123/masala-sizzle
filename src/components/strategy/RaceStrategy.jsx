import { PitWindow } from './PitWindow'
import { TyreDegChart } from './TyreDegChart'
import { ERSFuelWarning } from './ERSFuelWarning'
import { getStrategy } from '../../data/strategy'

const WEATHER_LABELS = ['Dry', 'Light Cloud', 'Overcast', 'Light Rain', 'Heavy Rain', 'Storm']
const WEATHER_COLORS = ['var(--text)', 'var(--text-dim)', 'var(--text-dim)', 'var(--steer)', 'var(--steer)', 'var(--brake)']

export function RaceStrategy({ state }) {
  const {
    trackId, weather, trackTemperature, airTemperature,
    safetyCarStatus, virtualSafetyCarStatus, sessionTypeName,
    currentLapNum, totalLaps, sessionLaps, tyresAgeLaps,
  } = state

  const strategy = trackId >= 0 ? getStrategy(trackId) : null
  const scActive  = safetyCarStatus === 1 || safetyCarStatus === 2
  const vscActive = virtualSafetyCarStatus === 1
  const isWet = (weather ?? 0) >= 3

  return (
    <div>
      {(scActive || vscActive) && (
        <div className="sc-banner" style={{ marginBottom: 8, borderRadius: 4 }}>
          {vscActive ? 'VIRTUAL SAFETY CAR — consider pitting' : 'SAFETY CAR — prime opportunity to pit'}
        </div>
      )}

      <div className="weather-bar" style={{ marginBottom: 8, borderRadius: 4 }}>
        <span className="weather-label">Weather:</span>
        <span className="weather-value" style={{ color: WEATHER_COLORS[weather ?? 0] }}>
          {WEATHER_LABELS[weather ?? 0]}
        </span>
        <span className="track-temp" style={{ marginLeft: 8 }}>
          Track <span>{trackTemperature}°</span>
        </span>
        <span className="track-temp" style={{ marginLeft: 8 }}>
          Air <span>{airTemperature}°</span>
        </span>
        {isWet && (
          <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--steer)', fontWeight: 700 }}>
            — Check inter/wet compound
          </span>
        )}
        {strategy?.safetyCarNote && (
          <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-dim)' }}>
            {strategy.safetyCarNote}
          </span>
        )}
      </div>

      <div className="strategy-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <PitWindow state={state} />
          <ERSFuelWarning state={state} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TyreDegChart sessionLaps={sessionLaps} currentLap={currentLapNum} tyresAgeLaps={tyresAgeLaps} />
        </div>
      </div>
    </div>
  )
}
