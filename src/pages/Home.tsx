import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { projects } from '../data/projects'
import { ClientLogo } from '../components/ClientLogo'
import { Icon } from '../design-system/Icon'
import { Marquee } from '../components/Marquee'
import { AnimatedTitle, Reveal, Stagger, StaggerGroup } from '../components/motion'

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 2)
  const others = projects.filter((p) => !p.featured).slice(0, 4)

  return (
    <>
      {/* Hero : titre, intro, deux grands visuels */}
      <section className="home-hero shell">
        <AnimatedTitle text={site.headline} className="xt-h1 home-hero__title" delay={0.1} />
        <Reveal delay={0.4}>
          <p className="xt-lead home-hero__intro">{site.intro}</p>
        </Reveal>
        <Reveal delay={0.55}>
          <div className="visual visual--hero" aria-hidden="true">
            <Icon name="sparkles" className="visual__icon" />
          </div>
        </Reveal>
        <Reveal>
          <div className="visual visual--wide" aria-hidden="true">
            <Icon name="chart-line-up" className="visual__icon" />
          </div>
        </Reveal>
      </section>

      {/* Info */}
      <section className="block shell">
        <p className="xt-h3 block__label">Info</p>
        <Reveal className="block__body">
          <p className="block__text">{site.info}</p>
          <Link to="/a-propos" className="xt-link block__more">
            En savoir plus
          </Link>
        </Reveal>
      </section>

      {/* Services */}
      <section className="block block--stack shell">
        <p className="xt-h3 block__label">Services</p>
        <StaggerGroup className="services">
          {site.services.map((s, i) => (
            <Stagger key={s.title} className="service">
              <p className="service__num">{String(i + 1).padStart(3, '0')}</p>
              <h3 className="xt-h3">{s.title}</h3>
              <p className="service__kicker">{s.kicker}</p>
              <p className="xt-small">{s.text}</p>
            </Stagger>
          ))}
        </StaggerGroup>
      </section>

      {/* Projets */}
      <section className="block shell">
        <div className="block__label">
          <p className="xt-h3">Projets</p>
          <p className="xt-small block__note">
            Des missions data, simulation et IA pour les acteurs de l'énergie.
          </p>
          <Link to="/projets" className="xt-link block__more">
            Tout voir
          </Link>
        </div>

        <div className="block__body">
          <StaggerGroup className="work work--featured">
            {featured.map((p) => (
              <Stagger key={p.slug}>
                <Link to={`/projets/${p.slug}`} className="work-item">
                  <div className="visual visual--tile">
                    {p.image ? <img src={p.image} alt="" /> : <ClientLogo project={p} className="client-logo--lg" />}
                  </div>
                  <p className="work-item__title">{p.title}</p>
                  <p className="xt-small">{p.client} · {p.type}</p>
                </Link>
              </Stagger>
            ))}
          </StaggerGroup>

          <StaggerGroup className="work work--grid">
            {others.map((p) => (
              <Stagger key={p.slug}>
                <Link to={`/projets/${p.slug}`} className="work-item" aria-label={p.title}>
                  <div className="visual visual--square">
                    {p.image ? <img src={p.image} alt="" /> : <ClientLogo project={p} className="client-logo--lg" />}
                  </div>
                </Link>
              </Stagger>
            ))}
          </StaggerGroup>
          <p className="work-item__title">Autres projets</p>
          <p className="xt-small">Data, simulation et IA pour l'énergie</p>
        </div>
      </section>

      {/* Bandeau des savoir-faire (pas de logos clients) */}
      <section className="block--band">
        <Marquee items={site.marquee} />
      </section>
    </>
  )
}
