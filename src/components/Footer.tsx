import { AnimatedTitle, Reveal } from './motion'
import { site } from '../data/site'
import { Icon } from '../design-system/Icon'
import type { IconName } from '../design-system/icons'
import { Button } from './ui'

const LINK_ICONS: Record<string, IconName> = { GitHub: 'github', LinkedIn: 'linkedin' }

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <AnimatedTitle as="h2" text="Travaillons ensemble." className="xt-h1 footer__title" />
        <Reveal delay={0.15}>
          <Button variant="primary" href={`mailto:${site.email}`} iconLeft="envelope">
            Me contacter
          </Button>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="footer__links">
            {site.links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="xt-btn xt-btn--ghost xt-btn--icon"
                aria-label={l.label}
              >
                <Icon name={LINK_ICONS[l.label] ?? 'link'} />
              </a>
            ))}
          </div>
        </Reveal>
        <p className="xt-small">
          © {new Date().getFullYear()} {site.name}, {site.city}
        </p>
        <p className="xt-small footer__credit">
          Icônes :{' '}
          <a className="xt-link" href="https://www.flaticon.com/uicons" target="_blank" rel="noreferrer">
            UIcons par Flaticon
          </a>
        </p>
      </div>
    </footer>
  )
}
