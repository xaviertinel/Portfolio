import { Link, Navigate, useParams } from 'react-router-dom'
import { articles } from '../data/articles'
import { articleBodies } from '../articles'
import { Icon } from '../design-system/Icon'
import { spot } from '../components/effects'
import { AnimatedTitle, Reveal, Stagger, StaggerGroup } from '../components/motion'
import { Kwh } from '../game/Game'

export default function Articles() {
  return (
    <section className="section section--top">
      <div className="shell rel">
        <Kwh id="articles" style={{ top: 20, right: '30%' }} />
        <Reveal><p className="xt-eyebrow">Énergie, vivant et données</p></Reveal>
        <AnimatedTitle text="Articles" className="xt-h1 page__title" delay={0.1} />
        <Reveal delay={0.3}><p className="xt-lead page__lead">Des analyses, un récit, un quiz et une carte : quatre façons de regarder l'énergie.</p></Reveal>
        <StaggerGroup className="grid grid--wide">
          {articles.map((a) => (
            <Stagger key={a.slug}>
              <Link to={`/articles/${a.slug}`} className="xt-card project-card spot" onMouseMove={spot}>
                <span className="article-card__icon"><Icon name={a.icon} size="lg" /></span>
                <span className="xt-eyebrow">{a.kind} · {a.minutes} min</span>
                <h2 className="xt-h3">{a.title}</h2>
                <p className="xt-small">{a.summary}</p>
                <span className="project-card__cta">Lire <Icon name="arrow-right" size="sm" /></span>
              </Link>
            </Stagger>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

export function ArticleDetail() {
  const { slug } = useParams()
  const meta = articles.find((a) => a.slug === slug)
  const Body = slug ? articleBodies[slug] : undefined
  if (!meta || !Body) return <Navigate to="/articles" replace />
  const next = articles[(articles.indexOf(meta) + 1) % articles.length]
  return (
    <article className="section section--top" key={meta.slug}>
      <div className="shell">
        <Reveal>
          <Link to="/articles" className="xt-btn xt-btn--ghost backlink"><Icon name="angle-small-right" size="sm" className="flip" />Articles</Link>
        </Reveal>
        <Reveal><p className="xt-eyebrow">{meta.kind} · {meta.minutes} min de lecture</p></Reveal>
        <AnimatedTitle text={meta.title} className="xt-h1 page__title" delay={0.1} />
        <Reveal delay={0.3}><p className="xt-lead page__lead">{meta.summary}</p></Reveal>
        <div className="article"><Body /></div>
        <Link to={`/articles/${next.slug}`} className="nextlink">
          <span className="xt-eyebrow">Article suivant</span>
          <span className="xt-h2 nextlink__title">{next.title}</span>
        </Link>
      </div>
    </article>
  )
}
