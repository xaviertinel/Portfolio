import { useState } from 'react'
import { fmt, path, scale } from '../lib/util'
import { H, M, Plot, Tile, W, ticks } from './ui'

// Bilan fictif : 100 ktCO2e en 2024, cible de −45 % en 2030.
const BASE = 100
const TARGET = 55
const LEVERS = [
  { id: 'fleet', label: 'Électrifier la flotte', cut: 18, cost: 40 },
  { id: 'buy', label: 'Achats responsables', cut: 14, cost: 15 },
  { id: 'enr', label: 'Électricité renouvelable', cut: 11, cost: 25 },
  { id: 'build', label: 'Sobriété des bâtiments', cut: 9, cost: -20 },
  { id: 'commute', label: 'Mobilité des salariés', cut: 6, cost: 60 },
]

export default function Trajectory() {
  const [on, setOn] = useState<string[]>(['build', 'buy'])
  const active = LEVERS.filter((l) => on.includes(l.id))
  const cut = active.reduce((s, l) => s + l.cut, 0)
  const end = BASE - cut
  const cost = active.reduce((s, l) => s + l.cut * l.cost, 0) // k€ : kt × €/t
  const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030]

  const x = scale(2024, 2030, M.l + 8, W - M.r - 8)
  const y = scale(40, 105, H - M.b, M.t)
  const traj = years.map((yr, i) => [x(yr), y(BASE - (cut * i) / 6)] as [number, number])
  const goal = years.map((yr, i) => [x(yr), y(BASE - ((BASE - TARGET) * i) / 6)] as [number, number])
  const toggle = (id: string) => setOn((s) => (s.includes(id) ? s.filter((v) => v !== id) : [...s, id]))

  return (
    <div className="demo">
      <div className="levers">
        {[...LEVERS].sort((a, b) => a.cost - b.cost).map((l) => (
          <button key={l.id} type="button" className="lever" aria-pressed={on.includes(l.id)} onClick={() => toggle(l.id)}>
            <span className="lever__name">{l.label}</span>
            <span className="lever__meta">{`−${l.cut} kt · ${l.cost > 0 ? '+' : ''}${l.cost} €/t`}</span>
          </button>
        ))}
      </div>
      <div className="demo__kpis">
        <Tile tone="blue" label="Émissions en 2030" value={`${fmt(end)} ktCO₂e`} />
        <Tile tone={end <= TARGET ? 'gold' : undefined} label="Cible de −45 %"
          value={end <= TARGET ? 'Atteinte' : `Reste ${fmt(end - TARGET)} kt`} />
        <Tile label="Coût net annuel" value={`${cost < 0 ? '−' : ''}${fmt(Math.abs(cost))} k€`} />
      </div>
      <Plot label="Trajectoire d'émissions jusqu'en 2030 comparée à la cible"
        yTicks={ticks(40, 100, 3).map((v) => ({ y: y(v), text: `${v}` }))}
        xTicks={years.map((v) => ({ x: x(v), text: `${v}` }))}>
        <path className="plot__line plot__line--dash" d={path(goal)} />
        <path className="plot__area" d={`${path(traj)} L${x(2030)},${H - M.b} L${x(2024)},${H - M.b} Z`} />
        <path className="plot__line" d={path(traj)} />
      </Plot>
      <p className="demo__legend">
        <span className="key key--a" /> Trajectoire avec les leviers choisis <span className="key key--b" /> Cible. Leviers triés par coût de la tonne évitée.
      </p>
    </div>
  )
}
