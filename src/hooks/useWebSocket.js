import { useEffect, useRef, useState, useCallback } from 'react'

const WS_URL = `ws://${window.location.hostname}/ws`
const BACKOFF = [1000, 2000, 4000, 8000, 15000, 30000]

export function useWebSocket(onMessage) {
  const [status, setStatus] = useState('disconnected') // 'connected' | 'connecting' | 'disconnected'
  const ws = useRef(null)
  const attempt = useRef(0)
  const timer = useRef(null)
  const onMsgRef = useRef(onMessage)
  onMsgRef.current = onMessage

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) return
    setStatus('connecting')
    const sock = new WebSocket(WS_URL)
    ws.current = sock

    sock.onopen = () => {
      setStatus('connected')
      attempt.current = 0
    }

    sock.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data)
        onMsgRef.current?.(msg)
      } catch { /* ignore malformed */ }
    }

    sock.onclose = () => {
      setStatus('disconnected')
      const delay = BACKOFF[Math.min(attempt.current, BACKOFF.length - 1)]
      attempt.current++
      timer.current = setTimeout(connect, delay)
    }

    sock.onerror = () => {
      sock.close()
    }
  }, [])

  useEffect(() => {
    connect()
    return () => {
      clearTimeout(timer.current)
      ws.current?.close()
    }
  }, [connect])

  const send = useCallback((msg) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(typeof msg === 'string' ? msg : JSON.stringify(msg))
    }
  }, [])

  return { status, send }
}
