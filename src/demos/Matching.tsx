import { useMemo, useState } from 'react'
import { fmt, norm } from '../lib/util'
import { Range, Tile } from './ui'

// Deux registres fictifs qui décrivent les mêmes actifs avec des libellés différents.
const TECH = [
  'Transformateur HTA/BT 400 kVA, poste Nord 12', 'Cellule disjoncteur 20 kV, poste Atlas', 'Ligne aérienne 60 kV, tronçon Est 4',
  'Groupe électrogène 250 kVA, site Oasis', 'Câble souterrain 20 kV, boucle Centre', 'Compteur communicant, lot 2019 série B',
  'Transformateur HTA/BT 630 kVA, poste Sud 3', 'Batterie de condensateurs 5 MVAr, poste Atlas', 'Pylône treillis 225 kV, ligne Ouest',
  'Automate de téléconduite, poste Nord 12',
]
const LEDGER: { label: string; amount: number; truth: number }[] = [
  { label: 'TRANSFO HTA BT 400KVA PST NORD 12', amount: 184000, truth: 0 },
  { label: 'CELL. DISJ 20KV POSTE ATLAS', amount: 96000, truth: 1 },
  { label: 'LIGNE AER 60 KV TRONCON EST N4', amount: 1240000, truth: 2 },
  { label: 'GPE ELECTROGENE 250 KVA OASIS', amount: 73000, truth: 3 },
  { label: 'CABLE SOUT. 20KV BOUCLE CENTRE', amount: 410000, truth: 4 },
  { label: 'COMPTEURS COMM LOT 2019 B', amount: 265000, truth: 5 },
  { label: 'TRANSFO 630 KVA PST SUD 3', amount: 221000, truth: 6 },
  { label: 'BATT CONDENS 5MVAR ATLAS', amount: 158000, truth: 7 },
  { label: 'PYLONE 225KV LIGNE O.', amount: 530000, truth: 8 },
  { label: 'AUTOMATE TELECOND NORD 12', amount: 64000, truth: 9 },
  { label: 'MOBILIER BUREAU SIEGE', amount: 22000, truth: -1 },
  { label: 'VEHICULE UTILITAIRE 2017', amount: 31000, truth: -1 },
]

/** Bigrammes d'un libellé normalisé (casse, accents, ponctuation, abréviations courantes). */
function grams(s: string) {
  const t = norm(s).replace(/[^a-z0-9]+/g, ' ')
    .replace(/\btransformateur\b/g, 'transfo').replace(/\bposte\b/g, 'pst').replace(/\b(\d+) (kv|kva|mvar)\b/g, '$1$2')
    .replace(/\s+/g, ' ').trim()
  const g = new Set<string>()
  for (let i = 0; i < t.length - 1; i++) g.add(t.slice(i, i + 2))
  return g
}
/** Coefficient de Dice entre deux ensembles de bigrammes. */
function dice(a: Set<string>, b: Set<string>) {
  let n = 0
  a.forEach((x) => b.has(x) && n++)
  return (2 * n) / (a.size + b.size || 1)
}

export default function Matching() {
  const [threshold, setThreshold] = useState(55)
  const rows = useMemo(() => {
    const tg = TECH.map(grams)
    return LEDGER.map((l) => {
      const lg = grams(l.label)
      const scores = tg.map((g) => dice(g, lg))
      const best = scores.indexOf(Math.max(...scores))
      return { ...l, best, score: scores[best] * 100 }
    })
  }, [])

  const matched = rows.filter((r) => r.score >= threshold)
  const correct = matched.filter((r) => r.best === r.truth).length
  const precision = matched.length ? (correct / matched.length) * 100 : 100
  const recall = (correct / rows.filter((r) => r.truth >= 0).length) * 100
  const amount = matched.reduce((s, r) => s + r.amount, 0)

  return (
    <div className="demo">
      <div className="demo__controls">
        <Range label="Seuil de similarité" value={threshold} min={20} max={95} unit={' %'} onChange={setThreshold} />
      </div>
      <div className="demo__kpis">
        <Tile tone="blue" label="Lignes rapprochées" value={`${matched.length} / ${rows.length}`} />
        <Tile label="Précision" value={`${fmt(precision)} %`} />
        <Tile label="Rappel" value={`${fmt(recall)} %`} />
        <Tile tone="gold" label="Montant rapproché" value={`${fmt(amount / 1000)} k€`} />
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Comptabilité</th><th>Meilleur candidat (inventaire technique)</th><th>Similarité</th><th>Décision</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const ok = r.score >= threshold
              return (
                <tr key={r.label} className={ok ? '' : 'is-off'}>
                  <td className="mono">{r.label}</td>
                  <td>{TECH[r.best]}</td>
                  <td>
                    <span className="meter"><span className="meter__fill" style={{ width: `${r.score}%` }} /></span>
                    <span className="mono">{fmt(r.score)} %</span>
                  </td>
                  <td>{ok ? (r.best === r.truth ? 'Rapproché' : 'Faux positif') : 'À revoir'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
