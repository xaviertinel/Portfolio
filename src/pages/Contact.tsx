import { site } from '../data/site'
import { Icon } from '../design-system/Icon'
import { AnimatedTitle, Reveal, Stagger, StaggerGroup } from '../components/motion'
import { Kwh } from '../game/Game'
import { CV_FILENAME, cvUrl } from '../lib/assets'

export default function Contact() {
  return (
    <section className="section section--top">
      <div className="shell rel">
        <Kwh id="contact" style={{ top: 120, right: '20%' }} />
        <Reveal><p className="xt-eyebrow">Ouvert aux échanges</p></Reveal>
        <AnimatedTitle text="Contact" className="xt-h1 page__title" delay={0.1} />
        <Reveal delay={0.3}>
          <p className="xt-lead page__lead">Un poste, une mission ou une question sur l'énergie et la data ? Écrivez-moi, je réponds rapidement.</p>
        </Reveal>
        <StaggerGroup className="contact" gap={0.1}>
          <Stagger><a className="xt-h2 xt-link contact__primary" href={`mailto:${site.email}`}>{site.email}</a></Stagger>
          <Stagger>
            <div className="contact__rows">
              <div className="contact__row"><span className="contact__key">Localisation</span><span>{site.city}</span></div>
              <div className="contact__row"><span className="contact__key">Langues</span><span>Français, espagnol, anglais</span></div>
              {site.links.map((l) => (
                <div className="contact__row" key={l.label}>
                  <span className="contact__key">{l.label}</span>
                  <a className="xt-link contact__val" href={l.url} target="_blank" rel="noreferrer">Voir le profil <Icon name="arrow-up-right" size="sm" /></a>
                </div>
              ))}
              <div className="contact__row">
                <span className="contact__key">CV</span>
                <a className="xt-link contact__val" href={cvUrl} download={CV_FILENAME}>Télécharger le PDF <Icon name="download" size="sm" /></a>
              </div>
            </div>
          </Stagger>
        </StaggerGroup>
      </div>
    </section>
  )
}
