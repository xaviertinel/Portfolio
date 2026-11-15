import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../data/site'
import { projects } from '../data/projects'
import { articles } from '../data/articles'
import { Icon } from '../design-system/Icon'
import { Marquee } from '../components/Marquee'
import { ProjectCard } from '../components/ProjectCard'
import { Tesseract } from '../components/Tesseract'
import { CountUp, Typed, spot } from '../components/effects'
import { Reveal, Stagger, StaggerGroup } from '../components/motion'
import { Button } from '../components/ui'
import { Kwh } from '../game/Game'
import { CV_FILENAME, cvUrl, packUrl } from '../lib/assets'

/** Parcours en onglets : un poste à la fois. */
function Experience() {
  const [i, setI] = useState(0)
  const e = site.experience[i]
  return (
    <div className="xp">
      <div className="xp__tabs" role="tablist" aria-label="Expériences">
        {site.experience.map((x, n) => (
          <button key={x.tab} type="button" role="tab" aria-selected={n === i} className="xp__tab" onClick={() => setI(n)}>
            {x.tab}
          </button>
        ))}
      </div>
      <div className="xp__panel" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div key={e.tab} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.2 }}>
            <h3 className="xt-h3">{e.title}</h3>
            <p className="xp__org">{e.org}</p>
            <p className="xt-timeline__date">{e.date} · {e.place}</p>
            <ul className="ticks">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Home() {
  const featured = projects.filter((p) => p.featured)

  return (
    <>
      <section className="hero">
        <div className="shell hero__grid rel">
          <div>
            <Reveal><p className="xt-eyebrow">{site.role}</p></Reveal>
            <Typed text={site.hello} className="xt-display hero__title" />
            <Reveal delay={0.3}><p className="hero__headline">{site.headline}</p></Reveal>
            <Reveal delay={0.45}><p className="xt-lead">{site.intro}</p></Reveal>
            <Reveal delay={0.6}>
              <div className="btn-row">
                <Button variant="primary" to="/projets" icon="arrow-right">Voir les projets</Button>
                <a className="xt-btn xt-btn--secondary" href={cvUrl} download={CV_FILENAME}><Icon name="download" size="sm" />Télécharger le CV</a>
              </div>
            </Reveal>
          </div>
          <div className="hero__visual">
            <Tesseract />
            <Kwh id="home-hero" style={{ right: '8%', bottom: '10%' }} />
          </div>
        </div>

        <StaggerGroup className="shell kpis">
          {site.kpis.map((k) => (
            <Stagger key={k.label}>
              <div className="xt-kpi">
                <span className="xt-kpi__value"><CountUp value={k.value} suffix={k.suffix} /></span>
                <span className="xt-kpi__label">{k.label}</span>
              </div>
            </Stagger>
          ))}
        </StaggerGroup>
      </section>

      <Marquee items={site.marquee} />

      <section className="block shell">
        <div className="block__label">
          <h2 className="xt-h2 slash">À propos</h2>
        </div>
        <Reveal className="block__body">
          <p className="block__text">{site.about[0]}</p>
          <Link to="/a-propos" className="pack-teaser spot" onMouseMove={spot}>
            <img src={packUrl} alt="" loading="lazy" />
            <span>
              <strong>Mon starter pack</strong>
              <small>Neuf objets pour me résumer, du casque de chantier au tesseract.</small>
            </span>
            <Icon name="arrow-right" />
          </Link>
        </Reveal>
      </section>

      <section className="block shell rel">
        <Kwh id="home-parcours" style={{ left: '22%', top: '42%' }} />
        <div className="block__label">
          <h2 className="xt-h2 slash">Parcours</h2>
          <p className="xt-small block__note">Cinq ans entre data science et conseil en stratégie, toujours dans l'énergie.</p>
          <Link to="/a-propos" className="xt-link block__more">Parcours complet</Link>
        </div>
        <Reveal className="block__body"><Experience /></Reveal>
      </section>

      <section className="block block--stack shell">
        <div className="section__head">
          <h2 className="xt-h2 slash">Projets</h2>
          <Button variant="ghost" to="/projets" icon="arrow-right">Tous les projets ({projects.length})</Button>
        </div>
        <p className="xt-lead">Chaque projet s'accompagne d'une démo interactive, sur données synthétiques.</p>
        <StaggerGroup className="grid">
          {featured.map((p) => <Stagger key={p.slug}><ProjectCard project={p} /></Stagger>)}
        </StaggerGroup>
      </section>

      <section className="block shell rel">
        <Kwh id="home-articles" style={{ right: '4%', top: '14%' }} />
        <div className="block__label">
          <h2 className="xt-h2 slash">Articles</h2>
          <p className="xt-small block__note">Énergie, vivant et données : des formats à lire et à manipuler.</p>
          <Link to="/articles" className="xt-link block__more">Tous les articles</Link>
        </div>
        <StaggerGroup className="block__body rows">
          {articles.map((a, i) => (
            <Stagger key={a.slug}>
              <Link to={`/articles/${a.slug}`} className="row-link">
                <span className="row-link__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="row-link__main"><strong>{a.title}</strong><small>{a.kind} · {a.minutes} min</small></span>
                <Icon name="arrow-up-right" size="sm" />
              </Link>
            </Stagger>
          ))}
        </StaggerGroup>
      </section>

      <section className="block shell">
        <div className="block__label">
          <h2 className="xt-h2 slash">Ressources</h2>
        </div>
        <Reveal className="block__body">
          <p className="block__text">Cinq petits outils gratuits : convertisseur d'énergie, CO₂ d'un trajet, coût de recharge, intervalle de confiance et statistiques d'un CSV.</p>
          <div className="btn-row"><Button variant="secondary" to="/ressources" icon="arrow-right">Ouvrir les outils</Button></div>
        </Reveal>
      </section>
    </>
  )
}
