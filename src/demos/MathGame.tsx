import { useEffect, useRef, useState } from 'react'
import { Tile } from './ui'

const newQ = () => {
  const a = 2 + Math.floor(Math.random() * 11)
  const b = 2 + Math.floor(Math.random() * 11)
  return Math.random() < 0.5 ? { text: `${a} × ${b}`, ans: a * b } : { text: `${a * 7} + ${b * 3}`, ans: a * 7 + b * 3 }
}

export default function MathGame() {
  const [left, setLeft] = useState(0)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [q, setQ] = useState(newQ)
  const [input, setInput] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (left <= 0) return
    const id = setTimeout(() => setLeft((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [left])
  useEffect(() => {
    if (left === 0) setBest((b) => Math.max(b, score))
  }, [left, score])

  const start = () => {
    setScore(0); setLeft(30); setQ(newQ()); setInput('')
    setTimeout(() => ref.current?.focus(), 0)
  }
  const type = (v: string) => {
    setInput(v)
    if (+v === q.ans && v !== '') { setScore((s) => s + 1); setQ(newQ()); setInput('') }
  }

  return (
    <div className="demo">
      <div className="demo__kpis">
        <Tile tone="blue" label="Temps restant" value={`${left} s`} />
        <Tile label="Score" value={score} />
        <Tile tone="gold" label="Meilleur score" value={best} />
      </div>
      {left > 0 ? (
        <div className="mathgame">
          <p className="mathgame__q" aria-live="polite">{q.text}</p>
          <input ref={ref} className="field mathgame__in" inputMode="numeric" aria-label="Votre réponse"
            value={input} onChange={(e) => type(e.target.value.replace(/\D/g, ''))} />
        </div>
      ) : (
        <div className="mathgame">
          <button type="button" className="xt-btn xt-btn--primary" onClick={start}>
            {best ? 'Rejouer 30 secondes' : 'Lancer 30 secondes'}
          </button>
        </div>
      )}
    </div>
  )
}
