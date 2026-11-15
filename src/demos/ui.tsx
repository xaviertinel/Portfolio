import type { ReactNode } from 'react'
import { fmt } from '../lib/util'

/** Curseur avec libellé et valeur affichée. */
export function Range({ label, value, min, max, step = 1, unit = '', digits = 0, onChange }: {
  label: string; value: number; min: number; max: number; step?: number; unit?: string; digits?: number
  onChange: (v: number) => void
}) {
  return (
    <label className="ctl">
      <span className="ctl__row">
        <span>{label}</span>
        <output className="ctl__val">{fmt(value, digits)}{unit}</output>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} />
    </label>
  )
}

/** Boutons segmentés : un seul choix actif. */
export function Seg<T extends string>({ label, value, options, onChange }: {
  label: string; value: T; options: { id: T; label: string }[]; onChange: (v: T) => void
}) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} type="button" className="seg__btn" aria-pressed={o.id === value} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

/** Tuile de chiffre clé d'une démo. */
export function Tile({ label, value, tone }: { label: string; value: ReactNode; tone?: 'gold' | 'blue' }) {
  return (
    <div className={`tile-kpi${tone ? ` tile-kpi--${tone}` : ''}`}>
      <span className="tile-kpi__value">{value}</span>
      <span className="tile-kpi__label">{label}</span>
    </div>
  )
}

export const W = 640
export const H = 280
export const M = { l: 48, r: 16, t: 16, b: 32 }

/** Cadre SVG commun : graduations horizontales et étiquettes d'axes. */
export function Plot({ yTicks, xTicks, children, label }: {
  yTicks: { y: number; text: string }[]; xTicks: { x: number; text: string }[]; children: ReactNode; label: string
}) {
  return (
    <svg className="plot" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
      {yTicks.map((t) => (
        <g key={t.text + t.y}>
          <line className="plot__grid" x1={M.l} x2={W - M.r} y1={t.y} y2={t.y} />
          <text className="plot__ax" x={M.l - 8} y={t.y + 4} textAnchor="end">{t.text}</text>
        </g>
      ))}
      {xTicks.map((t) => (
        <text key={t.text + t.x} className="plot__ax" x={t.x} y={H - 10} textAnchor="middle">{t.text}</text>
      ))}
      {children}
    </svg>
  )
}

/** Graduations régulières entre deux bornes. */
export const ticks = (lo: number, hi: number, n = 4) => Array.from({ length: n + 1 }, (_, i) => lo + ((hi - lo) * i) / n)
