import { AnimatedTitle, Reveal } from './motion'
import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="shell">
        <AnimatedTitle
          as="h2"
          text="Travaillons ensemble."
          className="footer__title display"
        />
        <Reveal delay={0.15}>
          <a className="footer__email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="footer__links">
            {site.links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        </Reveal>
        <p className="footer__copy">
          © {new Date().getFullYear()} {site.name} — {site.city}
        </p>
      </div>
    </footer>
  )
}
