const LIGHT_COLORS = [
  'green','green','green','green','green',
  'red','red','red','red','red',
  'blue','blue','blue','blue','blue',
]

export function RevLightBar({ revLightsBitValue }) {
  const bits = revLightsBitValue ?? 0
  const isBlue = (bits & 0x7C00) === 0x7C00

  return (
    <div className="rev-light-bar">
      {LIGHT_COLORS.map((color, i) => {
        const lit = (bits >> i) & 1
        const cls = lit ? (isBlue ? 'blue' : color) : ''
        return <div key={i} className={`rev-light ${cls}`} />
      })}
    </div>
  )
}
