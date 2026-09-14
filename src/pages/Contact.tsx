import { site } from '../data/site'
import { AnimatedTitle, Reveal, Stagger, StaggerGroup } from '../components/motion'

export default function Contact() {
  return (
    <section className="section section--top">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Disponible pour de nouveaux projets</p>
        </Reveal>
        <AnimatedTitle text="Contact" className="page__title display" delay={0.1} />
        <Reveal delay={0.35}>
          <p className="page__lead">
            Un projet, une question, ou juste envie d'échanger — écris-moi, je
            réponds rapidement.
          </p>
        </Reveal>

        <StaggerGroup className="contact" gap={0.1}>
          <Stagger>
            <a className="contact__primary" href={`mailto:${site.email}`}>
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
                    className="contact__val contact__val--link"
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Voir le profil →
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
