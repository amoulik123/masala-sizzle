import { useRef, useState, useCallback } from 'react'

const MAX_LOG = 20
const VOICE_PREF = ['en-GB', 'en-AU', 'en-US']

function getBritishVoice() {
  const voices = window.speechSynthesis?.getVoices() ?? []
  for (const pref of VOICE_PREF) {
    const v = voices.find((v) => v.lang.startsWith(pref))
    if (v) return v
  }
  return voices[0] ?? null
}

export function useRadioEngineer() {
  const [log, setLog] = useState([])      // last 20 messages
  const [banner, setBanner] = useState(null)  // current slide-up banner
  const [muted, setMuted] = useState(false)
  const cooldowns = useRef({})           // category → timestamp
  const bannerTimer = useRef(null)

  const speak = useCallback((text) => {
    if (muted) return
    if (!window.speechSynthesis) return
    const utt = new SpeechSynthesisUtterance(text)
    const voice = getBritishVoice()
    if (voice) utt.voice = voice
    utt.rate = 1.0
    utt.pitch = 0.9
    utt.lang = 'en-GB'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utt)
  }, [muted])

  const addMessage = useCallback((msg) => {
    const entry = {
      message: msg.message,
      priority: msg.priority ?? 'info',  // 'info' | 'warning' | 'critical'
      category: msg.category ?? 'general',
      ts: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }

    // Check cooldown for non-lap-complete messages
    const COOLDOWNS = {
      tyre_critical: 25000,
      ers_warning: 30000,
      fuel_warning: 60000,
      multi_lap_trend: 90000,
      brake_temp: 30000,
    }
    const cooldown = COOLDOWNS[entry.category]
    if (cooldown) {
      const last = cooldowns.current[entry.category] ?? 0
      if (Date.now() - last < cooldown) return  // skip — too soon
      cooldowns.current[entry.category] = Date.now()
    }

    setLog((prev) => [entry, ...prev].slice(0, MAX_LOG))

    // Show banner
    setBanner(entry)
    clearTimeout(bannerTimer.current)
    bannerTimer.current = setTimeout(() => setBanner(null), 6000)

    // Speak
    speak(entry.message)
  }, [speak])

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      if (!m) window.speechSynthesis?.cancel()
      return !m
    })
  }, [])

  return { log, banner, muted, addMessage, toggleMute }
}
