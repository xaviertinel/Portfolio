import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { fmt } from '../lib/util'

/** Texte tapé lettre par lettre, avec curseur clignotant. */
export function Typed({ text, className, speed = 70 }: { text: string; className?: string; speed?: number }) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? text.length : 0)
  useEffect(() => {
    if (n >= text.length) return
    const id = setTimeout(() => setN((v) => v + 1), speed)
    return () => clearTimeout(id)
  }, [n, text, speed])
  return (
    <h1 className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      <span className="caret" aria-hidden="true" />
    </h1>
  )
}

/** Compteur qui monte de 0 à la valeur quand il entre à l'écran. */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (reduce) return setV(value)
    let raf = 0
    const t0 = performance.now()
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1200)
      setV(value * (1 - (1 - k) ** 3))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [seen, value, reduce])
  return <span ref={ref}>{fmt(Math.round(v))}{suffix}</span>
}

/** Barre de progression de lecture, en haut de page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26 })
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
}

/** Halo qui suit la souris : à poser en onMouseMove sur un élément .spot. */
export function spot(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}
