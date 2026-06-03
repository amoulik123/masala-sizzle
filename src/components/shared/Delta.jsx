export function Delta({ ms, alwaysSign = true, size = 'sm' }) {
  if (ms == null) return <span className={`delta neutral`}>—</span>
  const abs = Math.abs(ms)
  const s = (abs / 1000).toFixed(3)
  const cls = ms < 0 ? 'faster' : ms > 0 ? 'slower' : 'neutral'
  const sign = ms < 0 ? '-' : ms > 0 ? '+' : ''
  return <span className={`delta ${cls}`}>{alwaysSign ? sign : ''}{s}</span>
}
