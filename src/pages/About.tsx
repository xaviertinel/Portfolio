import { site } from '../data/site'
import { AnimatedTitle, Reveal, Stagger, StaggerGroup } from '../components/motion'

export default function About() {
  return (
    <section className="section section--top">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{site.role}</p>
        </Reveal>
        <AnimatedTitle text="À propos" className="page__title display" delay={0.1} />

        <div className="about">
          <div className="about__text">
            <StaggerGroup gap={0.12}>
              {site.about.map((para, i) => (
                <Stagger key={i}>
                  <p>{para}</p>
                </Stagger>
              ))}
            </StaggerGroup>
          </div>

          <aside className="about__side">
            <StaggerGroup gap={0.1}>
              {site.skills.map((group) => (
                <Stagger key={group.label}>
                  <div className="skill">
                    <h3 className="skill__label">{group.label}</h3>
                    <ul className="skill__items">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Stagger>
              ))}
            </StaggerGroup>
          </aside>
        </div>
      </div>
    </section>
  )
}
