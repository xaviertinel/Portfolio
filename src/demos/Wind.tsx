import { useMemo, useState } from 'react'
import { fmt, gauss, path, rng, scale } from '../lib/util'
import { H, M, Plot, Range, Seg, Tile, W, ticks } from './ui'

type Model = 'linear' | 'poly' | 'knn'
type Pt = { v: number; p: number }

/** Courbe de puissance théorique d'une éolienne de 3 MW (vent en m/s). */
const curve = (v: number) => {
  if (v < 3 || v > 24) return 0
  if (v >= 12.5) return 3
  const t = (v - 3) / 9.5
  return 3 * t * t * (3 - 2 * t)
}

/** Relevés synthétiques : vent → production, avec bruit de mesure. */
function build() {
  const r = rng(7)
  const pts: Pt[] = Array.from({ length: 180 }, () => {
    const v = Math.min(22, Math.abs(8 + gauss(r) * 4.2))
    return { v, p: Math.max(0, Math.min(3.1, curve(v) + gauss(r) * 0.18)) }
  })
  return { train: pts.filter((_, i) => i % 4 !== 0), test: pts.filter((_, i) => i % 4 === 0) }
}

/** Moindres carrés polynomiaux : résout (XᵀX)β = Xᵀy par élimination de Gauss. */
function fitPoly(pts: Pt[], deg: number) {
  const n = deg + 1
  const A = Array.from({ length: n }, () => new Array(n + 1).fill(0))
  for (const { v, p } of pts) {
    const x = v / 22
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) A[i][j] += x ** (i + j)
      A[i][n] += p * x ** i
    }
  }
  for (let i = 0; i < n; i++) {
    let m = i
    for (let k = i + 1; k < n; k++) if (Math.abs(A[k][i]) > Math.abs(A[m][i])) m = k
    ;[A[i], A[m]] = [A[m], A[i]]
    for (let k = i + 1; k < n; k++) {
      const f = A[k][i] / A[i][i]
      for (let j = i; j <= n; j++) A[k][j] -= f * A[i][j]
    }
  }
  const b = new Array(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    b[i] = A[i][n]
    for (let j = i + 1; j < n; j++) b[i] -= A[i][j] * b[j]
    b[i] /= A[i][i]
  }
  return (v: number) => b.reduce((s, c, i) => s + c * (v / 22) ** i, 0)
}

const fitKnn = (pts: Pt[], k: number) => (v: number) => {
  const near = [...pts].sort((a, b) => Math.abs(a.v - v) - Math.abs(b.v - v)).slice(0, k)
  return near.reduce((s, q) => s + q.p, 0) / near.length
}

export default function Wind() {
  const { train, test } = useMemo(build, [])
  const [model, setModel] = useState<Model>('linear')
  const [k, setK] = useState(7)

  const predict = useMemo(
    () => (model === 'linear' ? fitPoly(train, 1) : model === 'poly' ? fitPoly(train, 5) : fitKnn(train, k)),
    [model, k, train],
  )
  const mae = test.reduce((s, q) => s + Math.abs(predict(q.v) - q.p), 0) / test.length
  const mean = test.reduce((s, q) => s + q.p, 0) / test.length
  const ssRes = test.reduce((s, q) => s + (predict(q.v) - q.p) ** 2, 0)
  const ssTot = test.reduce((s, q) => s + (q.p - mean) ** 2, 0)
  const r2 = 1 - ssRes / ssTot

  const x = scale(0, 22, M.l, W - M.r)
  const y = scale(-0.3, 3.4, H - M.b, M.t)
  const fit = Array.from({ length: 89 }, (_, i) => [x(i / 4), y(predict(i / 4))] as [number, number])

  return (
    <div className="demo">
      <div className="demo__controls">
        <Seg label="Modèle" value={model} onChange={setModel} options={[
          { id: 'linear', label: 'Régression linéaire' }, { id: 'poly', label: 'Polynôme de degré 5' }, { id: 'knn', label: 'k plus proches voisins' },
        ]} />
        {model === 'knn' && <Range label="Nombre de voisins k" value={k} min={1} max={40} onChange={setK} />}
      </div>
      <div className="demo__kpis">
        <Tile tone="blue" label="Erreur absolue moyenne (test)" value={`${fmt(mae * 1000)} kW`} />
        <Tile tone={r2 > 0.9 ? 'gold' : undefined} label="R² sur les données de test" value={fmt(r2, 3)} />
        <Tile label="Entraînement / test" value={`${train.length} / ${test.length}`} />
      </div>
      <Plot label="Production en fonction du vent, relevés et modèle"
        yTicks={ticks(0, 3, 3).map((v) => ({ y: y(v), text: `${v} MW` }))}
        xTicks={ticks(0, 20, 5).map((v) => ({ x: x(v), text: `${v} m/s` }))}>
        {train.map((q, i) => <circle key={i} className="plot__pt" cx={x(q.v)} cy={y(q.p)} r={2.5} />)}
        {test.map((q, i) => <circle key={i} className="plot__pt plot__pt--test" cx={x(q.v)} cy={y(q.p)} r={3} />)}
        <path className="plot__line" d={path(fit)} />
      </Plot>
      <p className="demo__legend">
        <span className="key key--dot" /> Entraînement <span className="key key--gold" /> Test <span className="key key--a" /> Modèle
      </p>
    </div>
  )
}
