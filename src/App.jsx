import { useState, useCallback } from 'react'
import { TelemetryProvider, useTelemetry } from './hooks/useTelemetry'
import { useWebSocket } from './hooks/useWebSocket'
import { useRadioEngineer } from './hooks/useRadioEngineer'
import { useInputMode } from './hooks/useInputMode'
import { Header } from './components/layout/Header'
import { LiveDashboard } from './components/live/LiveDashboard'
import { AssistsPanel } from './components/live/AssistsPanel'
import { PostLapAnalysis } from './components/analysis/PostLapAnalysis'
import { EvolutionDashboard } from './components/evolution/EvolutionDashboard'
import { SetupAdvisor } from './components/setup/SetupAdvisor'
import { RaceStrategy } from './components/strategy/RaceStrategy'

function Inner() {
  const { state, handleMessage } = useTelemetry()
  const { log, banner, muted, addMessage, toggleMute } = useRadioEngineer()
  const { mode: inputMode, setMode: setInputMode } = useInputMode()
  const [activeTab, setActiveTab] = useState('Live')

  const onMessage = useCallback((msg) => {
    handleMessage(msg)
    if (msg.type === 'radio_message') {
      addMessage({ message: msg.message, priority: msg.priority, category: msg.category })
    }
  }, [handleMessage, addMessage])

  const { status: wsStatus } = useWebSocket(onMessage)

  return (
    <div className="app">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wsStatus={wsStatus}
        inputMode={inputMode}
        setInputMode={setInputMode}
        trackName={state.trackName}
        sessionTypeName={state.sessionTypeName}
      />
      <main className="app-main">
        {activeTab === 'Live' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <LiveDashboard
              state={state}
              lastAnalysis={state.lastAnalysis}
              banner={banner}
              log={log}
              muted={muted}
              toggleMute={toggleMute}
            />
            <AssistsPanel state={state} />
          </div>
        )}
        {activeTab === 'Analysis' && (
          <PostLapAnalysis lastAnalysis={state.lastAnalysis} bestLapTimeMs={state.bestLapTimeMs} />
        )}
        {activeTab === 'Evolution' && (
          <EvolutionDashboard state={state} />
        )}
        {activeTab === 'Setup' && (
          <SetupAdvisor state={state} inputMode={inputMode} />
        )}
        {activeTab === 'Strategy' && (
          <RaceStrategy state={state} />
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <TelemetryProvider>
      <Inner />
    </TelemetryProvider>
  )
}
