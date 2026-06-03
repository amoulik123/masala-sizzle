import { useContext, useRef, useEffect, useState } from 'react'

function fmtDist(m) { return m != null ? `${Math.round(m)}m` : '—' }
function fmtSpd(s)  { return s != null ? `${Math.round(s)}` : '—' }
function fmtPct(p)  { return p != null ? `${Math.round(p * 100)}%` : '—' }

export function BrakingTable({ corners }) {
  if (!corners || corners.length === 0) {
    return (
      <div className="panel">
        <div className="panel-header"><span className="panel-title">Braking Zones</span></div>
        <div className="empty-state" style={{ padding: '20px 12px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>Complete a lap to see braking data</div>
        </div>
      </div>
    )
  }

  return (
    <div className="panel">
      <div className="panel-header"><span className="panel-title">Braking Zones</span></div>
      <div className="braking-table-wrap" style={{ padding: '0 4px 4px' }}>
        <table className="braking-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Corner</th>
              <th>Entry</th>
              <th>Brk%</th>
              <th>Dist</th>
              <th>Apex</th>
              <th>Exit</th>
              <th>Trail</th>
            </tr>
          </thead>
          <tbody>
            {corners.map((c, i) => (
              <tr key={i}>
                <td>{c.name}</td>
                <td>{fmtSpd(c.entrySpeed)}</td>
                <td>{fmtPct(c.maxBrakePressure)}</td>
                <td>{fmtDist(c.brakingDistance)}</td>
                <td>{fmtSpd(c.apexSpeed)}</td>
                <td>{fmtSpd(c.exitSpeed)}</td>
                <td className={c.trailBraking ? 'td-positive' : 'td-negative'}>
                  {c.trailBraking ? 'Y' : 'N'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
