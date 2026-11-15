import { useState } from 'react'
import { projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { AnimatedTitle, Reveal } from '../components/motion'
import { Kwh } from '../game/Game'

export default function Work() {
  const qualities = ['Tous', ...new Set(projects.map((p) => p.quality))]
  const [q, setQ] = useState('Tous')
  const list = projects.filter((p) => q === 'Tous' || p.quality === q)
  return (
    <section className="section section--top">
      <div className="shell rel">
        <Kwh id="projets" style={{ top: 8, right: '18%' }} />
        <Reveal><p className="xt-eyebrow">{projects.length} projets, {projects.length} démos</p></Reveal>
        <AnimatedTitle text="Projets" className="xt-h1 page__title" delay={0.1} />
        <Reveal delay={0.3}>
          <p className="xt-lead page__lead">Des missions de conseil dans l'énergie et quelques outils personnels. Les contextes sont anonymisés et chaque démo tourne sur des données synthétiques.</p>
        </Reveal>
        <div className="seg seg--wrap" role="group" aria-label="Filtrer par compétence">
          {qualities.map((x) => (
            <button key={x} type="button" className="seg__btn" aria-pressed={x === q} onClick={() => setQ(x)}>{x}</button>
          ))}
        </div>
        <div className="grid grid--top">
          {list.map((p) => <div key={p.slug}><ProjectCard project={p} /></div>)}
        </div>
      </div>
    </section>
  )
}
