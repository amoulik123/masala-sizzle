import { useState } from 'react'

function formatReport(analysis) {
  if (!analysis) return ''
  const { lapNum, lapTimeMs, fuelCorrectedMs, analysis: a } = analysis
  const fmtMs = ms => {
    if (!ms) return '--'
    const m = Math.floor(ms / 60000)
    const s = ((ms % 60000) / 1000).toFixed(3)
    return `${m}:${s.padStart(6,'0')}`
  }
  const lines = [
    `F1 25 Race Engineer — Lap ${lapNum} Analysis`,
    `Lap Time: ${fmtMs(lapTimeMs)}  Fuel-Corrected: ${fmtMs(fuelCorrectedMs)}`,
    `Verdict: ${a?.verdict ?? 'No analysis available'}`,
    '',
  ]
  if (a?.stats) {
    const s = a.stats
    lines.push(`Stats: full throttle ${s.fullThrottlePct?.toFixed(1)}% | coasting ${s.coastingPct?.toFixed(1)}% | lockups ${s.lockupCount} | trail braking ${s.trailBrakingPct?.toFixed(1)}%`)
    lines.push('')
  }
  if (a?.top3?.length) {
    lines.push('Top 3 Improvements:')
    a.top3.forEach((t, i) => lines.push(`  ${i+1}. [${t.corner}] ${t.message}`))
    lines.push('')
  }
  if (a?.corners?.length) {
    lines.push('Corner Breakdown:')
    a.corners.forEach(c => {
      lines.push(`  ${c.name}: entry ${Math.round(c.entrySpeed)}→apex ${Math.round(c.apexSpeed)}→exit ${Math.round(c.exitSpeed)} km/h | brake ${Math.round((c.maxBrakePressure??0)*100)}% | trail ${c.trailBraking?'Y':'N'}`)
      if (c.coaching) lines.push(`    → ${c.coaching}`)
    })
  }
  return lines.join('\n')
}

export function CopyButton({ analysis }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = formatReport(analysis)
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy} disabled={!analysis}>
      {copied ? 'Copied!' : 'Copy for Claude'}
    </button>
  )
}
