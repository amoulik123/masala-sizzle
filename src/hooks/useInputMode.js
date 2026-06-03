import { useState, useCallback } from 'react'

const KEY = 'f1_input_mode'

export function useInputMode() {
  const [mode, setModeState] = useState(() => localStorage.getItem(KEY) ?? 'wheel')

  const setMode = useCallback((m) => {
    localStorage.setItem(KEY, m)
    setModeState(m)
  }, [])

  return { mode, setMode }
}
