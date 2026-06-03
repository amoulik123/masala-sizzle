export function GaugeBar({ value, max = 100, color, style }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className="gauge-bar" style={style}>
      <div className="gauge-bar-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}
