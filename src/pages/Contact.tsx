import { site } from '../data/site'
import { Icon } from '../design-system/Icon'
import { AnimatedTitle, Reveal, Stagger, StaggerGroup } from '../components/motion'

export default function Contact() {
  return (
    <section className="section section--top">
      <div className="shell">
        <Reveal>
          <p className="xt-eyebrow">Disponible pour de nouveaux projets</p>
        </Reveal>
        <AnimatedTitle text="Contact" className="xt-h1 page__title" delay={0.1} />
        <Reveal delay={0.35}>
          <p className="xt-lead page__lead">
            Un projet, une question, ou juste envie d'échanger ? Écrivez-moi, je
            réponds rapidement.
          </p>
        </Reveal>

        <StaggerGroup className="contact" gap={0.1}>
          <Stagger>
            <a className="xt-h2 xt-link contact__primary" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </Stagger>
          <Stagger>
            <div className="contact__rows">
              <div className="contact__row">
                <span className="contact__key">Localisation</span>
                <span className="contact__val">{site.city}</span>
              </div>
              <div className="contact__row">
                <span className="contact__key">Langues</span>
                <span className="contact__val">Français, Espagnol</span>
              </div>
              {site.links.map((l) => (
                <div className="contact__row" key={l.label}>
                  <span className="contact__key">{l.label}</span>
                  <a
                    className="xt-link contact__val"
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Voir le profil <Icon name="arrow-up-right" size="sm" />
                  </a>
                </div>
              ))}
            </div>
          </Stagger>
        </StaggerGroup>
      </div>
    </section>
  )
}
