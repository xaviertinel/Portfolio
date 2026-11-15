import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { projects } from '../data/projects'
import { ClientLogo } from '../components/ClientLogo'
import { Kwh } from '../game/Game'

const EASE = [0.2, 0.8, 0.2, 1] as const

/** Page Projets : index en lignes numérotées, le client en grand. */
export default function Work() {
  return (
    <section className="index rel" aria-label="Projets">
      <h1 className="index__sr">Projets</h1>
      <Kwh id="projets" style={{ top: 8, right: '8%' }} />
      <p className="xt-small index__note shell">
        {projects.length} projets, {projects.length} démos interactives. Chaque démo tourne sur des données synthétiques, donc anonymisées.
      </p>
      <motion.ol className="index__list" initial="hidden" animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
        {projects.map((p, i) => (
          <motion.li key={p.slug}
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}>
            <Link to={`/projets/${p.slug}`} className="row" aria-label={`${p.client} : ${p.title}`}>
              <span className="row__n" aria-hidden="true">[{String(i + 1).padStart(2, '0')}]</span>
              <span className="row__name">
                <span aria-hidden="true">
                  {[...p.client].map((c, k) => (
                    <span key={k} className="row__l" style={{ '--k': k } as CSSProperties}>{c === ' ' ? ' ' : c}</span>
                  ))}
                </span>
              </span>
              <span className="row__type">
                {p.logo && <ClientLogo project={p} />}
                <span>{p.title}</span>
                <span className="row__quality">{p.quality}</span>
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  )
}
