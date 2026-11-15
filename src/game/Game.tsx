import { createContext, useCallback, useContext, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { Icon } from '../design-system/Icon'
import { projects } from '../data/projects'

/**
 * Mode jeu « Chasse aux kWh » : des éclairs sont cachés dans tout le site.
 * Chaque éclair trouvé recharge la batterie. La progression est gardée dans le navigateur.
 */
export const KWH_IDS = [
  'home-hero', 'home-parcours', 'home-articles', 'projets', 'a-propos', 'starter-pack', 'articles', 'ressources', 'contact',
  ...projects.map((p) => `projet-${p.slug}`),
]

type Game = { on: boolean; toggle: () => void; found: string[]; collect: (id: string) => void; reset: () => void }
const Ctx = createContext<Game>({ on: false, toggle: () => {}, found: [], collect: () => {}, reset: () => {} })
export const useGame = () => useContext(Ctx)

const load = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key)
    return v ? (JSON.parse(v) as T) : fallback
  } catch {
    return fallback
  }
}
const save = (key: string, v: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(v))
  } catch {
    /* stockage indisponible : la partie vaut pour la session */
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(() => load('game:on', false))
  const [found, setFound] = useState<string[]>(() => load<string[]>('game:found', []).filter((id) => KWH_IDS.includes(id)))

  useEffect(() => {
    document.documentElement.classList.toggle('is-game', on)
    save('game:on', on)
  }, [on])
  useEffect(() => save('game:found', found), [found])

  const toggle = useCallback(() => setOn((v) => !v), [])
  const collect = useCallback((id: string) => setFound((f) => (f.includes(id) ? f : [...f, id])), [])
  const reset = useCallback(() => setFound([]), [])
  const value = useMemo(() => ({ on, toggle, found, collect, reset }), [on, toggle, found, collect, reset])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

/** Éclair à ramasser. Invisible hors mode jeu ou une fois trouvé. */
export function Kwh({ id, style }: { id: string; style?: CSSProperties }) {
  const { on, found, collect } = useGame()
  if (!on || found.includes(id)) return null
  return (
    <button type="button" className="kwh" style={style} onClick={() => collect(id)} aria-label="Ramasser un kWh">
      <Icon name="bolt" size="sm" />
    </button>
  )
}

/** Bouton d'en-tête qui active le mode jeu. */
export function GameToggle() {
  const { on, toggle } = useGame()
  return (
    <button type="button" className="game-toggle" aria-pressed={on} onClick={toggle}>
      <Icon name="rocket-lunch" size="sm" />
      <span>Mode jeu</span>
      <span className="game-toggle__knob" aria-hidden="true" />
    </button>
  )
}

const RANKS = ['Pile bouton', 'Batterie de vélo', 'Borne de recharge', 'Poste source', 'Centrale à vous seul']

/** Tableau de bord du jeu : batterie, rang, remise à zéro. */
export function GameHud() {
  const { on, found, reset, toggle } = useGame()
  if (!on) return null
  const total = KWH_IDS.length
  const pct = Math.round((found.length / total) * 100)
  const rank = RANKS[Math.min(RANKS.length - 1, Math.floor((found.length / total) * (RANKS.length - 1) + 0.001))]
  const done = found.length === total
  return (
    <aside className={`hud${done ? ' hud--done' : ''}`} aria-label="Chasse aux kWh">
      <div className="hud__head">
        <strong>Chasse aux kWh</strong>
        <button type="button" className="hud__close" onClick={toggle} aria-label="Quitter le mode jeu">
          <Icon name="cross" size="sm" />
        </button>
      </div>
      <div className="hud__battery" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={found.length}>
        <span className="hud__charge" style={{ width: `${pct}%` }} />
      </div>
      <p className="hud__line" aria-live="polite">
        <span className="mono">{found.length} / {total} kWh</span> · {rank}
      </p>
      <p className="hud__hint">
        {done
          ? 'Batterie pleine. Vous avez exploré tout le site : il ne reste plus qu’à m’écrire.'
          : 'Des éclairs dorés sont cachés sur chaque page et dans chaque projet. Cliquez pour recharger.'}
      </p>
      {found.length > 0 && (
        <button type="button" className="xt-link hud__reset" onClick={reset}>Recommencer</button>
      )}
    </aside>
  )
}
