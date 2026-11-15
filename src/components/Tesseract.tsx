import { useEffect, useRef } from 'react'

// Les 16 sommets d'un hypercube et ses 32 arêtes (deux sommets qui ne diffèrent que d'une coordonnée).
const V = Array.from({ length: 16 }, (_, i) => [i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1, i & 8 ? 1 : -1])
const E: [number, number][] = []
for (let i = 0; i < 16; i++) for (let b = 0; b < 4; b++) if (!(i & (1 << b))) E.push([i, i | (1 << b)])

const rot = (p: number[], a: number, b: number, t: number) => {
  const c = Math.cos(t), s = Math.sin(t)
  const q = [...p]
  q[a] = p[a] * c - p[b] * s
  q[b] = p[a] * s + p[b] * c
  return q
}

/** Tesseract en rotation, dessiné en canvas 2D : clin d'œil à l'objet du starter pack. */
export function Tesseract() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current!
    const ctx = cv.getContext('2d')!
    const css = getComputedStyle(document.documentElement)
    const from = css.getPropertyValue('--decor-from').trim()
    const to = css.getPropertyValue('--decor-to').trim()
    const gold = css.getPropertyValue('--accent').trim()
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let mx = 0, my = 0
    let visible = true

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      mx = (e.clientX - r.left) / r.width - 0.5
      my = (e.clientY - r.top) / r.height - 0.5
    }
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting))
    io.observe(cv)
    window.addEventListener('pointermove', onMove)

    const draw = (ms: number) => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = cv.clientWidth, h = cv.clientHeight
      if (cv.width !== w * dpr || cv.height !== h * dpr) { cv.width = w * dpr; cv.height = h * dpr }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const t = still ? 0.9 : ms / 1000
      const size = Math.min(w, h) * 0.3

      const pts = V.map((v) => {
        let p = rot(v, 0, 3, t * 0.45)
        p = rot(p, 1, 2, t * 0.3 + mx * 1.2)
        p = rot(p, 2, 3, t * 0.2)
        p = rot(p, 0, 1, my * 0.9)
        const k4 = 2.4 / (3.2 - p[3]) // 4D → 3D
        const k3 = 3.2 / (4.6 - p[2] * k4) // 3D → 2D
        return { x: w / 2 + p[0] * k4 * k3 * size, y: h / 2 + p[1] * k4 * k3 * size, d: k4 * k3 }
      })

      const g = ctx.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, from)
      g.addColorStop(1, to)
      ctx.lineCap = 'round'
      for (const [a, b] of E) {
        const d = (pts[a].d + pts[b].d) / 2
        ctx.globalAlpha = Math.min(1, 0.25 + d * 0.45)
        ctx.lineWidth = 0.8 + d * 1.3
        ctx.strokeStyle = g
        ctx.beginPath()
        ctx.moveTo(pts[a].x, pts[a].y)
        ctx.lineTo(pts[b].x, pts[b].y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      ctx.fillStyle = gold
      for (const p of pts) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5 + p.d * 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
      if (still) cancelAnimationFrame(raf)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} className="tesseract" aria-hidden="true" />
}
