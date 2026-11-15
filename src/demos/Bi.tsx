import { useMemo, useState } from 'react'
import { fmt, path, rng, scale } from '../lib/util'
import { H, M, Plot, Seg, Tile, W, ticks } from './ui'

const SITES = ['Site A', 'Site B', 'Site C', 'Site D', 'Site E']
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
type Metric = 'rate' | 'backlog' | 'delay'
const METRICS: { id: Metric; label: string; unit: string; digits: number; better: 'high' | 'low' }[] = [
  { id: 'rate', label: 'Taux de réalisation', unit: ' %', digits: 1, better: 'high' },
  { id: 'backlog', label: 'Interventions en attente', unit: '', digits: 0, better: 'low' },
  { id: 'delay', label: 'Délai moyen', unit: ' j', digits: 1, better: 'low' },
]

/** Données synthétiques : 5 sites × 12 mois. */
function build() {
  const r = rng(42)
  return SITES.map((_, s) =>
    MONTHS.map((_, m) => ({
      rate: 82 + s * 2.2 + m * 0.5 + (r() - 0.5) * 8,
      backlog: Math.round(140 - s * 14 - m * 3 + (r() - 0.5) * 30),
      delay: 9.5 - s * 0.6 - m * 0.12 + (r() - 0.5) * 2,
    })),
  )
}

export default function Bi() {
  const data = useMemo(build, [])
  const [metric, setMetric] = useState<Metric>('rate')
  const [site, setSite] = useState(-1)
  const def = METRICS.find((m) => m.id === metric)!

  const avg = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length
  const agg = (vals: number[]) => (metric === 'backlog' ? vals.reduce((x, y) => x + y, 0) : avg(vals))
  const perSite = data.map((rows) => (metric === 'backlog' ? rows[11].backlog : avg(rows.map((d) => d[metric]))))
  const picked = site < 0 ? data : [data[site]]
  const series = MONTHS.map((_, m) => agg(picked.map((rows) => rows[m][metric])))
  const now = series[11]
  const delta = ((now - series[0]) / series[0]) * 100
  const good = def.better === 'high' ? delta >= 0 : delta <= 0
  const best = perSite.indexOf(def.better === 'high' ? Math.max(...perSite) : Math.min(...perSite))

  const lo = Math.min(...series) * 0.96
  const hi = Math.max(...series) * 1.04
  const x = scale(0, 11, M.l + 10, W - M.r - 10)
  const y = scale(lo, hi, H - M.b, M.t)
  const pts = series.map((v, i) => [x(i), y(v)] as [number, number])
  const maxBar = Math.max(...perSite)

  return (
    <div className="demo">
      <div className="demo__controls">
        <Seg label="Indicateur" value={metric} options={METRICS.map((m) => ({ id: m.id, label: m.label }))} onChange={setMetric} />
        <Seg label="Site" value={String(site)} onChange={(v) => setSite(+v)}
          options={[{ id: '-1', label: 'Tous' }, ...SITES.map((s, i) => ({ id: String(i), label: s }))]} />
      </div>

      <div className="demo__kpis">
        <Tile label={`${def.label}, décembre`} value={`${fmt(now, def.digits)}${def.unit}`} tone="blue" />
        <Tile label="Évolution sur 12 mois" value={`${delta > 0 ? '+' : ''}${fmt(delta, 1)} %`} tone={good ? 'gold' : undefined} />
        <Tile label="Meilleur site" value={SITES[best]} />
      </div>

      <div className="demo__split">
        <Plot label={`${def.label} par mois`}
          yTicks={ticks(lo, hi).map((v) => ({ y: y(v), text: fmt(v, def.digits) }))}
          xTicks={MONTHS.map((m, i) => ({ x: x(i), text: m }))}>
          <path className="plot__area" d={`${path(pts)} L${x(11)},${H - M.b} L${x(0)},${H - M.b} Z`} />
          <path className="plot__line" d={path(pts)} />
          {pts.map(([px, py], i) => <circle key={i} className="plot__dot" cx={px} cy={py} r={3} />)}
        </Plot>

        <div className="bars" role="list" aria-label="Classement des sites">
          {perSite.map((v, i) => (
            <button key={i} type="button" role="listitem" className="bars__row" aria-pressed={site === i}
              onClick={() => setSite(site === i ? -1 : i)}>
              <span className="bars__name">{SITES[i]}</span>
              <span className="bars__track"><span className="bars__fill" style={{ width: `${(v / maxBar) * 100}%` }} /></span>
              <span className="bars__val">{fmt(v, def.digits)}{def.unit}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
