import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../data/site'
import { starterPack } from '../data/starterpack'
import { Icon } from '../design-system/Icon'
import { AnimatedTitle, Reveal, Stagger, StaggerGroup } from '../components/motion'
import { Tag } from '../components/ui'
import { Kwh } from '../game/Game'
import { CV_FILENAME, cvUrl, packUrl } from '../lib/assets'

function StarterPack() {
  const [id, setId] = useState(starterPack[0].id)
  const item = starterPack.find((s) => s.id === id)!
  const index = starterPack.indexOf(item)
  return (
    <div className="pack">
      <div className="pack__photo rel">
        <img src={packUrl} alt="Neuf objets posés à plat : casque de chantier, voiture électrique miniature, clavier, sceau-cylindre, sabre laser, ceinture de judo, livre, tesseract et lapin en peluche." />
        {starterPack.map((s, i) => (
          <button key={s.id} type="button" className="pack__dot" aria-pressed={s.id === id} aria-label={s.name}
            style={{ left: `${s.x}%`, top: `${s.y}%` }} onClick={() => setId(s.id)}>
            {i + 1}
          </button>
        ))}
        <Kwh id="starter-pack" style={{ left: '33%', top: '88%' }} />
      </div>
      <div className="pack__panel" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            <p className="pack__num">{String(index + 1).padStart(2, '0')} / {String(starterPack.length).padStart(2, '0')}</p>
            <h3 className="xt-h3">{item.name}</h3>
            <p className="xt-eyebrow">L'objet</p>
            <p>{item.what}</p>
            <p className="xt-eyebrow">Pourquoi il me représente</p>
            <p>{item.why}</p>
          </motion.div>
        </AnimatePresence>
        <div className="pack__nav">
          <button type="button" className="xt-btn xt-btn--secondary" onClick={() => setId(starterPack[(index + starterPack.length - 1) % starterPack.length].id)}>
            <Icon name="angle-small-right" size="sm" className="flip" />Précédent
          </button>
          <button type="button" className="xt-btn xt-btn--secondary" onClick={() => setId(starterPack[(index + 1) % starterPack.length].id)}>
            Suivant<Icon name="angle-small-right" size="sm" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section className="section section--top">
      <div className="shell rel">
        <Kwh id="a-propos" style={{ top: 0, right: '6%' }} />
        <Reveal><p className="xt-eyebrow">{site.role}</p></Reveal>
        <AnimatedTitle text="À propos" className="xt-h1 page__title" delay={0.1} />

        <div className="about">
          <StaggerGroup gap={0.12} className="about__text">
            {site.about.map((para, i) => <Stagger key={i}><p>{para}</p></Stagger>)}
            <Stagger>
              <div className="btn-row">
                <a className="xt-btn xt-btn--primary" href={cvUrl} download={CV_FILENAME}><Icon name="download" size="sm" />Télécharger le CV</a>
                <a className="xt-btn xt-btn--secondary" href={cvUrl} target="_blank" rel="noreferrer"><Icon name="document" size="sm" />L'ouvrir en PDF</a>
              </div>
            </Stagger>
          </StaggerGroup>
          <aside>
            <StaggerGroup gap={0.1}>
              {site.skills.map((g) => (
                <Stagger key={g.label}>
                  <div className="skill">
                    <h2 className="xt-h3 skill__label">{g.label}</h2>
                    <div className="taglist taglist--tight">{g.items.map((it) => <Tag key={it}>{it}</Tag>)}</div>
                  </div>
                </Stagger>
              ))}
            </StaggerGroup>
          </aside>
        </div>

        <div className="subsection">
          <Reveal>
            <h2 className="xt-h2 slash">Mon starter pack</h2>
            <p className="xt-lead">Neuf objets pour me résumer. Cliquez sur un numéro : chaque objet a sa signification.</p>
          </Reveal>
          <Reveal><StarterPack /></Reveal>
        </div>

        <div className="subsection about">
          <div>
            <Reveal><h2 className="xt-h2 slash">Parcours</h2></Reveal>
            <ol className="xt-timeline timeline">
              {site.experience.map((e) => (
                <li key={e.title} className={`xt-timeline__item${e.current ? ' xt-timeline__item--current' : ''}`}>
                  <Reveal>
                    <span className="xt-timeline__date">{e.date}</span>
                    <p className="xt-timeline__title">{e.title}</p>
                    <p className="xt-small">{e.org} · {e.place}</p>
                    <ul className="ticks">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <aside className="about__facts">
            <Reveal>
              <h2 className="xt-h3 skill__label">Formation</h2>
              {site.education.map((e) => (
                <div key={e.org} className="skill">
                  <p className="xt-timeline__date">{e.date}</p>
                  <p><strong>{e.title}</strong> · {e.org}</p>
                  <p className="xt-small">{e.note}</p>
                </div>
              ))}
            </Reveal>
            <Reveal>
              <h2 className="xt-h3 skill__label">Certifications</h2>
              <ul className="ticks">{site.certifications.map((c) => <li key={c}>{c}</li>)}</ul>
            </Reveal>
            <Reveal>
              <h2 className="xt-h3 skill__label">Langues</h2>
              <ul className="ticks">{site.languages.map((c) => <li key={c}>{c}</li>)}</ul>
            </Reveal>
            <Reveal>
              <h2 className="xt-h3 skill__label">Passions</h2>
              <ul className="ticks">{site.passions.map((c) => <li key={c}>{c}</li>)}</ul>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  )
}
