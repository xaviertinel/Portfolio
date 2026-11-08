import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { projects } from '../data/projects'

const EASE = [0.2, 0.8, 0.2, 1] as const

export default function Work() {
  return (
    <section className="index" aria-label="Projets">
      <h1 className="index__sr">Projets</h1>
      <motion.ol
        className="index__list"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {projects.map((p, i) => (
          <motion.li
            key={p.slug}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
          >
            <Link to={`/projets/${p.slug}`} className="row">
              <span className="row__n" aria-hidden="true">
                [{String(i + 1).padStart(2, '0')}]
              </span>
              <span className="row__name" aria-label={p.title}>
                <span aria-hidden="true">
                  {[...p.title].map((c, k) => (
                    <span key={k} className="row__l" style={{ '--k': k } as CSSProperties}>
                      {c === ' ' ? ' ' : c}
                    </span>
                  ))}
                </span>
              </span>
              <span className="row__type">[{p.type}]</span>
              <span className="row__peek" aria-hidden="true">
                {p.tagline}
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  )
}
