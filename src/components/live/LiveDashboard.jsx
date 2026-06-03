import { SpeedGearRPM } from './SpeedGearRPM'
import { PedalGauges } from './PedalGauges'
import { TyreWidget } from './TyreWidget'
import { ERSWidget } from './ERSWidget'
import { FuelWidget } from './FuelWidget'
import { TimingWidget } from './TimingWidget'
import { RaceInfoWidget } from './RaceInfoWidget'
import { BrakingTable } from './BrakingTable'
import { RadioBanner } from '../layout/RadioBanner'

export function LiveDashboard({ state, lastAnalysis, banner, log, muted, toggleMute }) {
  const corners = lastAnalysis?.analysis?.corners ?? []

  return (
    <div className="live-grid">
      <div className="live-col-left">
        <SpeedGearRPM
          speed={state.speed}
          gear={state.gear}
          rpm={state.rpm}
          maxRPM={state.maxRPM}
          idleRPM={state.idleRPM}
          revLightsBitValue={state.revLightsBitValue}
        />
        <PedalGauges throttle={state.throttle} brake={state.brake} steer={state.steer} />
        <TimingWidget state={state} />
      </div>

      <div className="live-col-mid">
        <TyreWidget state={state} />
        <BrakingTable corners={corners} />
        <RadioBanner banner={banner} log={log} muted={muted} toggleMute={toggleMute} />
      </div>

      <div className="live-col-right">
        <ERSWidget
          ersStorePercent={state.ersStorePercent}
          ersDeplMode={state.ersDeplMode}
          ersDeplModeName={state.ersDeplModeName}
          ersFault={state.ersFault}
        />
        <FuelWidget
          fuelInTank={state.fuelInTank}
          fuelCapacity={state.fuelCapacity}
          fuelRemainingLaps={state.fuelRemainingLaps}
        />
        <RaceInfoWidget state={state} />
      </div>
    </div>
  )
}
