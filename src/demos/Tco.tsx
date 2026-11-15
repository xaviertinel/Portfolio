import { useState } from 'react'
import { fmt, path, scale } from '../lib/util'
import { H, M, Plot, Range, Tile, W, ticks } from './ui'

// Hypothèses fictives d'un véhicule utilitaire léger.
const ICE = { buy: 28000, per100: 6.5, upkeep: 0.06, co2: 2.6 } // L/100 km, €/km, kgCO2e/L
const EV = { buy: 37000, per100: 18, upkeep: 0.035, co2: 0.06 } // kWh/100 km, €/km, kgCO2e/kWh
const YEARS = 10

export default function Tco() {
  const [km, setKm] = useState(18000)
  const [fuel, setFuel] = useState(1.8)
  const [elec, setElec] = useState(0.2)

  const iceYear = km * ((ICE.per100 / 100) * fuel + ICE.upkeep)
  const evYear = km * ((EV.per100 / 100) * elec + EV.upkeep)
  const ice = Array.from({ length: YEARS + 1 }, (_, t) => ICE.buy + iceYear * t)
  const ev = Array.from({ length: YEARS + 1 }, (_, t) => EV.buy + evYear * t)
  const breakEven = iceYear > evYear ? (EV.buy - ICE.buy) / (iceYear - evYear) : Infinity
  const saving = ice[YEARS] - ev[YEARS]
  const co2 = (km * YEARS * ((ICE.per100 / 100) * ICE.co2 - (EV.per100 / 100) * EV.co2)) / 1000

  const hi = Math.max(ice[YEARS], ev[YEARS]) * 1.05
  const x = scale(0, YEARS, M.l + 8, W - M.r - 8)
  const y = scale(20000, hi, H - M.b, M.t)
  const line = (a: number[]) => path(a.map((v, t) => [x(t), y(v)]))

  return (
    <div className="demo">
      <div className="demo__controls demo__controls--grid">
        <Range label="Kilométrage annuel" value={km} min={5000} max={40000} step={1000} unit={' km'} onChange={setKm} />
        <Range label="Prix du carburant" value={fuel} min={1.3} max={2.6} step={0.05} digits={2} unit={' €/L'} onChange={setFuel} />
        <Range label="Prix de l'électricité" value={elec} min={0.1} max={0.45} step={0.01} digits={2} unit={' €/kWh'} onChange={setElec} />
      </div>

      <div className="demo__kpis">
        <Tile tone="blue" label="Point de bascule"
          value={breakEven <= YEARS ? `${fmt(breakEven, 1)} ans` : 'Au-delà de 10 ans'} />
        <Tile tone={saving > 0 ? 'gold' : undefined} label="Écart de TCO sur 10 ans"
          value={`${saving > 0 ? '−' : '+'}${fmt(Math.abs(saving))} €`} />
        <Tile label="CO₂e évité sur 10 ans" value={`${fmt(co2, 1)} t`} />
      </div>

      <Plot label="Coût cumulé thermique et électrique sur 10 ans"
        yTicks={ticks(20000, hi).map((v) => ({ y: y(v), text: `${fmt(v / 1000)} k€` }))}
        xTicks={Array.from({ length: YEARS + 1 }, (_, t) => ({ x: x(t), text: t === 0 ? 'Achat' : `${t}` }))}>
        {breakEven <= YEARS && (
          <g>
            <line className="plot__mark" x1={x(breakEven)} x2={x(breakEven)} y1={M.t} y2={H - M.b} />
            <text className="plot__ax plot__ax--strong" x={x(breakEven) + 6} y={M.t + 12}>bascule</text>
          </g>
        )}
        <path className="plot__line plot__line--muted" d={line(ice)} />
        <path className="plot__line" d={line(ev)} />
      </Plot>
      <p className="demo__legend">
        <span className="key key--a" /> Électrique <span className="key key--b" /> Thermique
      </p>
    </div>
  )
}
