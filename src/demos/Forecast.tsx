import { useMemo, useState } from 'react'
import { fmt, gauss, path, rng, scale } from '../lib/util'
import { H, M, Plot, Range, Tile, W, ticks } from './ui'

// Historique synthétique d'un territoire, en TWh.
const HIST = [41.2, 41.6, 41.1, 41.9, 42.3, 40.4, 41.5, 41.0, 40.2, 40.6]
const Y0 = 2015
const LAST = Y0 + HIST.length - 1
const END = 2030
const RUNS = 400

export default function Forecast() {
  const [growth, setGrowth] = useState(1.2)
  const [eff, setEff] = useState(1.0)
  const [electrif, setElectrif] = useState(4)

  const { p10, p50, p90 } = useMemo(() => {
    const r = rng(11)
    const n = END - LAST
    const sims = Array.from({ length: RUNS }, () => {
      let v = HIST[HIST.length - 1]
      const g = growth + gauss(r) * 0.5
      const e = eff + gauss(r) * 0.3
      const add = Math.max(0, electrif + gauss(r) * 1.2)
      return Array.from({ length: n }, (_, t) => {
        v = v * (1 + (g - e) / 100) + gauss(r) * 0.35
        return v + (add * (t + 1)) / n
      })
    })
    const q = (t: number, f: number) => sims.map((s) => s[t]).sort((a, b) => a - b)[Math.floor(f * (RUNS - 1))]
    const col = (f: number) => Array.from({ length: n }, (_, t) => q(t, f))
    return { p10: col(0.1), p50: col(0.5), p90: col(0.9) }
  }, [growth, eff, electrif])

  const last = HIST[HIST.length - 1]
  const x = scale(Y0, END, M.l, W - M.r - 8)
  const y = scale(34, 56, H - M.b, M.t)
  const fut = (a: number[]) => [[x(LAST), y(last)], ...a.map((v, t) => [x(LAST + t + 1), y(v)])] as [number, number][]
  const band = `${path(fut(p90))} ${path(fut(p10).reverse()).replace('M', 'L')} Z`
  const end = p50[p50.length - 1]

  return (
    <div className="demo">
      <div className="demo__controls demo__controls--grid">
        <Range label="Croissance de l'activité" value={growth} min={-1} max={3} step={0.1} digits={1} unit={' %/an'} onChange={setGrowth} />
        <Range label="Gains d'efficacité" value={eff} min={0} max={3} step={0.1} digits={1} unit={' %/an'} onChange={setEff} />
        <Range label="Électrification des usages d'ici 2030" value={electrif} min={0} max={12} step={0.5} digits={1} unit={' TWh'} onChange={setElectrif} />
      </div>
      <div className="demo__kpis">
        <Tile tone="blue" label="Consommation médiane en 2030" value={`${fmt(end, 1)} TWh`} />
        <Tile label="Intervalle P10 · P90" value={`${fmt(p10[p10.length - 1], 1)} · ${fmt(p90[p90.length - 1], 1)}`} />
        <Tile tone="gold" label={`Écart par rapport à ${LAST}`} value={`${end > last ? '+' : ''}${fmt(((end - last) / last) * 100, 1)} %`} />
      </div>
      <Plot label="Consommation historique et prévision à 2030 avec intervalle d'incertitude"
        yTicks={ticks(35, 55).map((v) => ({ y: y(v), text: `${v}` }))}
        xTicks={[2015, 2018, 2021, 2024, 2027, 2030].map((v) => ({ x: x(v), text: `${v}` }))}>
        <path className="plot__band" d={band} />
        <path className="plot__line plot__line--muted" d={path(HIST.map((v, i) => [x(Y0 + i), y(v)]))} />
        <path className="plot__line" d={path(fut(p50))} />
        <line className="plot__mark" x1={x(LAST)} x2={x(LAST)} y1={M.t} y2={H - M.b} />
      </Plot>
      <p className="demo__legend">
        <span className="key key--b" /> Historique <span className="key key--a" /> Médiane <span className="key key--band" /> P10 · P90, {RUNS} simulations
      </p>
    </div>
  )
}
