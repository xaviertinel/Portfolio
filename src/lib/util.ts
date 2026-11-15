/** Générateur pseudo-aléatoire à graine : les données synthétiques sont identiques à chaque visite. */
export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Tirage gaussien (Box-Muller) à partir d'un générateur uniforme. */
export function gauss(r: () => number) {
  return Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r())
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

const nf = (d: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: d, minimumFractionDigits: 0 })
/** Nombre au format français (espace insécable pour les milliers). */
export const fmt = (v: number, digits = 0) => nf(digits).format(v)

/** Échelle linéaire domaine → étendue. */
export const scale = (d0: number, d1: number, r0: number, r1: number) => (v: number) =>
  r0 + ((v - d0) / (d1 - d0 || 1)) * (r1 - r0)

/** Chemin SVG reliant des points. */
export const path = (pts: [number, number][]) =>
  pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

/** Minuscules sans accents, pour comparer des textes. */
export const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
