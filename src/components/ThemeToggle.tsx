import { useState } from 'react'
import { Icon } from '../design-system/Icon'

type Theme = 'light' | 'dark'

const current = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'

/** Bascule clair / sombre, mémorisée dans localStorage (thème initial posé dans index.html). */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(current)
  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  const toggle = () => {
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* stockage indisponible : le choix vaut pour la session */
    }
    setTheme(next)
  }

  return (
    <button
      type="button"
      className="xt-btn xt-btn--ghost xt-btn--icon"
      onClick={toggle}
      aria-label={next === 'dark' ? 'Passer en thème sombre' : 'Passer en thème clair'}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  )
}
