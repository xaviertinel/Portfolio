import { useMemo, useState, type ReactNode } from 'react'
import { Icon } from '../design-system/Icon'
import type { IconName } from '../design-system/icons'
import { AnimatedTitle, Reveal } from '../components/motion'
import { Range, Seg, Tile } from '../demos/ui'
import { Kwh } from '../game/Game'
import { fmt } from '../lib/util'

function Tool({ icon, title, note, children }: { icon: IconName; title: string; note: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="tool">
        <header className="tool__head">
          <span className="tool__icon"><Icon name={icon} /></span>
          <div>
            <h2 className="xt-h3">{title}</h2>
            <p className="xt-small">{note}</p>
          </div>
        </header>
        {children}
      </section>
    </Reveal>
  )
}

const num = (s: string) => parseFloat(s.replace(',', '.').replace(/\s/g, ''))

/* 1. Conversion d'énergie : tout passe par le kWh. */
const UNITS = [
  { id: 'kWh', k: 1 }, { id: 'MWh', k: 1000 }, { id: 'MJ', k: 1 / 3.6 }, { id: 'GJ', k: 1000 / 3.6 },
  { id: 'kcal', k: 0.001163 }, { id: 'tep', k: 11630 }, { id: 'BTU', k: 0.000293071 },
]
function Converter() {
  const [val, setVal] = useState('100')
  const [unit, setUnit] = useState('kWh')
  const kwh = num(val) * UNITS.find((u) => u.id === unit)!.k
  return (
    <>
      <div className="tool__row">
        <input className="field" inputMode="decimal" value={val} onChange={(e) => setVal(e.target.value)} aria-label="Valeur à convertir" />
        <select className="field" value={unit} onChange={(e) => setUnit(e.target.value)} aria-label="Unité de départ">
          {UNITS.map((u) => <option key={u.id}>{u.id}</option>)}
        </select>
      </div>
      <div className="demo__kpis">
        {UNITS.filter((u) => u.id !== unit).map((u) => (
          <Tile key={u.id} label={u.id} value={isFinite(kwh) ? fmt(kwh / u.k, kwh / u.k < 10 ? 3 : 1) : '·'} />
        ))}
      </div>
    </>
  )
}

/* 2. CO2 d'un trajet. Ordres de grandeur par passager et par km, cycle de vie (Base Empreinte ADEME). */
const MODES = [
  { id: 'Avion', g: 259 }, { id: 'Voiture thermique', g: 218 }, { id: 'Bus urbain', g: 113 },
  { id: 'Voiture électrique', g: 103 }, { id: 'TER', g: 28 }, { id: 'TGV', g: 3 },
]
function Trip() {
  const [km, setKm] = useState(450)
  const max = MODES[0].g * km
  return (
    <>
      <Range label="Distance" value={km} min={10} max={1500} step={10} unit={' km'} onChange={setKm} />
      <div className="bars bars--static">
        {MODES.map((m) => (
          <div key={m.id} className="bars__row">
            <span className="bars__name">{m.id}</span>
            <span className="bars__track"><span className="bars__fill" style={{ width: `${((m.g * km) / max) * 100}%` }} /></span>
            <span className="bars__val">{`${fmt((m.g * km) / 1000, 1)} kg`}</span>
          </div>
        ))}
      </div>
    </>
  )
}

/* 3. Coût d'une recharge de véhicule électrique. */
function Charge() {
  const [cons, setCons] = useState(17)
  const [price, setPrice] = useState(0.2)
  const [km, setKm] = useState(12000)
  const per100 = cons * price
  return (
    <>
      <div className="demo__controls demo__controls--grid">
        <Range label="Consommation" value={cons} min={11} max={28} step={0.5} digits={1} unit={' kWh/100 km'} onChange={setCons} />
        <Range label="Prix de l'électricité" value={price} min={0.1} max={0.8} step={0.01} digits={2} unit={' €/kWh'} onChange={setPrice} />
        <Range label="Kilométrage annuel" value={km} min={3000} max={40000} step={1000} unit={' km'} onChange={setKm} />
      </div>
      <div className="demo__kpis">
        <Tile tone="blue" label="Coût aux 100 km" value={`${fmt(per100, 2)} €`} />
        <Tile label="Budget annuel" value={`${fmt((per100 * km) / 100)} €`} />
        <Tile tone="gold" label="Énergie annuelle" value={`${fmt((cons * km) / 100)} kWh`} />
      </div>
    </>
  )
}

/* 4. Intervalle de confiance d'une proportion et taille d'échantillon. */
const Z = { '90': 1.645, '95': 1.96, '99': 2.576 }
function Confidence() {
  const [n, setN] = useState(400)
  const [p, setP] = useState(42)
  const [level, setLevel] = useState<keyof typeof Z>('95')
  const [margin, setMargin] = useState(3)
  const z = Z[level]
  const se = Math.sqrt(((p / 100) * (1 - p / 100)) / n)
  const moe = z * se * 100
  const need = Math.ceil((z * z * 0.25) / (margin / 100) ** 2)
  return (
    <>
      <Seg label="Niveau de confiance" value={level} onChange={setLevel}
        options={[{ id: '90', label: '90 %' }, { id: '95', label: '95 %' }, { id: '99', label: '99 %' }]} />
      <div className="demo__controls demo__controls--grid">
        <Range label="Taille de l'échantillon" value={n} min={30} max={3000} step={10} onChange={setN} />
        <Range label="Proportion observée" value={p} min={1} max={99} unit={' %'} onChange={setP} />
        <Range label="Marge d'erreur visée" value={margin} min={1} max={10} step={0.5} digits={1} unit={' pts'} onChange={setMargin} />
      </div>
      <div className="demo__kpis">
        <Tile tone="blue" label="Intervalle de confiance" value={`${fmt(Math.max(0, p - moe), 1)} · ${fmt(Math.min(100, p + moe), 1)} %`} />
        <Tile label="Marge d'erreur actuelle" value={`± ${fmt(moe, 1)} pts`} />
        <Tile tone="gold" label={`Échantillon pour ± ${fmt(margin, 1)} pts`} value={fmt(need)} />
      </div>
    </>
  )
}

/* 5. Statistiques descriptives d'un CSV collé. Rien ne quitte le navigateur. */
const SAMPLE = 'site;puissance_kw;disponibilite\nNord;2400;97,2\nSud;1800;94,5\nEst;3100;\nOuest;2750;98,1\nCentre;1950;91,8'
function CsvStats() {
  const [text, setText] = useState(SAMPLE)
  const cols = useMemo(() => {
    const lines = text.trim().split(/\r?\n/).filter(Boolean)
    if (lines.length < 2) return []
    const sep = [';', '\t', ','].find((s) => lines[0].includes(s)) ?? ','
    const head = lines[0].split(sep)
    const rows = lines.slice(1).map((l) => l.split(sep))
    return head.map((name, i) => {
      const raw = rows.map((r) => (r[i] ?? '').trim())
      const filled = raw.filter((v) => v !== '')
      const nums = filled.map(num).filter((v) => !isNaN(v))
      if (!nums.length || nums.length < filled.length) return { name, missing: raw.length - filled.length, text: `${new Set(filled).size} valeurs distinctes` }
      const s = [...nums].sort((a, b) => a - b)
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length
      const sd = Math.sqrt(nums.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(1, nums.length - 1))
      const med = s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2
      return { name, missing: raw.length - filled.length, mean, med, sd, min: s[0], max: s[s.length - 1] }
    })
  }, [text])
  return (
    <>
      <textarea className="field field--area" rows={6} value={text} onChange={(e) => setText(e.target.value)} aria-label="Données CSV" spellCheck={false} />
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Colonne</th><th>Moyenne</th><th>Médiane</th><th>Écart-type</th><th>Min · Max</th><th>Manquants</th></tr></thead>
          <tbody>
            {cols.map((c) => (
              <tr key={c.name}>
                <td><strong>{c.name}</strong></td>
                {c.mean !== undefined ? (
                  <>
                    <td className="mono">{fmt(c.mean, 2)}</td><td className="mono">{fmt(c.med!, 2)}</td>
                    <td className="mono">{fmt(c.sd!, 2)}</td><td className="mono">{`${fmt(c.min!, 2)} · ${fmt(c.max!, 2)}`}</td>
                  </>
                ) : <td colSpan={4}>{c.text}</td>}
                <td className="mono">{c.missing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default function Resources() {
  return (
    <section className="section section--top">
      <div className="shell rel">
        <Kwh id="ressources" style={{ top: 12, right: '12%' }} />
        <Reveal><p className="xt-eyebrow">Gratuit, sans inscription</p></Reveal>
        <AnimatedTitle text="Ressources" className="xt-h1 page__title" delay={0.1} />
        <Reveal delay={0.3}>
          <p className="xt-lead page__lead">Cinq petits outils que j'utilise ou que j'aurais aimé avoir sous la main. Tout se calcule dans votre navigateur : aucune donnée n'est envoyée.</p>
        </Reveal>
        <div className="tools">
          <Tool icon="bolt" title="Convertisseur d'énergie" note="kWh, MJ, tep, kcal, BTU : une valeur, toutes les unités."><Converter /></Tool>
          <Tool icon="leaf" title="CO₂ d'un trajet" note="Comparez les modes de transport, par passager. Ordres de grandeur de la Base Empreinte de l'ADEME."><Trip /></Tool>
          <Tool icon="rocket-lunch" title="Coût de recharge d'un véhicule électrique" note="Aux 100 km et sur l'année, selon votre prix du kWh."><Charge /></Tool>
          <Tool icon="chart-line-up" title="Intervalle de confiance et taille d'échantillon" note="Pour un sondage ou un test : quelle précision, et combien de réponses faut-il ?"><Confidence /></Tool>
          <Tool icon="database" title="Statistiques express d'un CSV" note="Collez vos données : moyenne, médiane, écart-type et valeurs manquantes par colonne."><CsvStats /></Tool>
        </div>
      </div>
    </section>
  )
}
