import { useMemo, useState } from 'react'
import { fmt, gauss, path, rng, scale } from '../lib/util'
import { H, M, Plot, Range, Tile, W, ticks } from './ui'

// Territoire fictif : points de recharge ouverts au public, en milliers.
const HIST = [1.1, 1.7, 2.6, 3.9, 5.6, 7.8, 10.2]
const Y0 = 2018
const LAST = Y0 + HIST.length - 1
const END = 2030
const RUNS = 400
const FLEET = 120 // véhicules électriques en circulation en 2024, en milliers

export default function Forecast() {
  const [growth, setGrowth] = useState(26)
  const [ratio, setRatio] = useState(11)
  const [publicShare, setPublicShare] = useState(100)

  const { p10, p50, p90 } = useMemo(() => {
    const r = rng(11)
    const n = END - LAST
    const sims = Array.from({ length: RUNS }, () => {
      const g = growth + gauss(r) * 5 // incertitude sur la croissance du parc
      const k = Math.max(5, ratio + gauss(r) * 1.4) // incertitude sur l'usage des bornes
      let fleet = FLEET
      return Array.from({ length: n }, () => {
        fleet *= 1 + (g + gauss(r) * 3) / 100
        return ((fleet / k) * publicShare) / 100
      })
    })
    const q = (t: number, f: number) => sims.map((s) => s[t]).sort((a, b) => a - b)[Math.floor(f * (RUNS - 1))]
    const col = (f: number) => Array.from({ length: n }, (_, t) => q(t, f))
    return { p10: col(0.1), p50: col(0.5), p90: col(0.9) }
  }, [growth, ratio, publicShare])

  const last = HIST[HIST.length - 1]
  const end = p50[p50.length - 1]
  const hi = Math.max(20, p90[p90.length - 1] * 1.08)
  const x = scale(Y0, END, M.l, W - M.r - 8)
  const y = scale(0, hi, H - M.b, M.t)
  const fut = (a: number[]) => [[x(LAST), y(last)], ...a.map((v, t) => [x(LAST + t + 1), y(v)])] as [number, number][]
  const band = `${path(fut(p90))} ${path(fut(p10).reverse()).replace('M', 'L')} Z`

  return (
    <div className="demo">
      <div className="demo__controls demo__controls--grid">
        <Range label="Croissance du parc électrique" value={growth} min={10} max={45} unit={' %/an'} onChange={setGrowth} />
        <Range label="Véhicules par point de recharge" value={ratio} min={6} max={20} onChange={setRatio} />
        <Range label="Part du besoin couverte par le public" value={publicShare} min={40} max={100} step={5} unit={' %'} onChange={setPublicShare} />
      </div>
      <div className="demo__kpis">
        <Tile tone="blue" label="Besoin médian en 2030" value={`${fmt(end, 1)} k points`} />
        <Tile label="Intervalle P10 · P90" value={`${fmt(p10[p10.length - 1], 1)} · ${fmt(p90[p90.length - 1], 1)}`} />
        <Tile tone="gold" label={`Par rapport à ${LAST}`} value={`× ${fmt(end / last, 1)}`} />
      </div>
      <Plot label="Points de recharge installés et besoin simulé à 2030 avec intervalle d'incertitude"
        yTicks={ticks(0, hi).map((v) => ({ y: y(v), text: `${fmt(v)} k` }))}
        xTicks={[2018, 2021, 2024, 2027, 2030].map((v) => ({ x: x(v), text: `${v}` }))}>
        <path className="plot__band" d={band} />
        <path className="plot__line plot__line--muted" d={path(HIST.map((v, i) => [x(Y0 + i), y(v)]))} />
        <path className="plot__line" d={path(fut(p50))} />
        <line className="plot__mark" x1={x(LAST)} x2={x(LAST)} y1={M.t} y2={H - M.b} />
      </Plot>
      <p className="demo__legend">
        <span className="key key--b" /> Installé <span className="key key--a" /> Besoin médian <span className="key key--band" /> P10 · P90, {RUNS} simulations
      </p>
    </div>
  )
}
