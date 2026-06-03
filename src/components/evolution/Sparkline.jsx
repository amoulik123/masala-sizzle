export function Sparkline({ data, width = 200, height = 40, color = 'var(--delta-faster)', dotColor }) {
  if (!data || data.length < 2) {
    return <svg width={width} height={height} className="sparkline-svg" />
  }

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pad = 4

  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2)
    const y = pad + ((max - v) / range) * (height - pad * 2)
    return `${x},${y}`
  })

  const lastPt = pts[pts.length - 1].split(',')

  return (
    <svg width={width} height={height} className="sparkline-svg">
      <polyline
        className="sparkline-line"
        points={pts.join(' ')}
        stroke={color}
        strokeOpacity={0.8}
      />
      <circle
        cx={lastPt[0]} cy={lastPt[1]} r={3}
        fill={dotColor ?? color}
      />
    </svg>
  )
}
