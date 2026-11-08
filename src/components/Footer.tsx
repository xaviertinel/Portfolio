import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <h2 className="xt-h1 footer__title">
          Échangeons,
          <br />
          construisons ensemble.
        </h2>
        <div className="footer__links">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.links.map((l) => (
            <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </div>
        <div className="footer__bottom xt-small">
          <span>
            © {new Date().getFullYear()} {site.name}, {site.city}
          </span>
          <span>
            Icônes :{' '}
            <a className="xt-link" href="https://www.flaticon.com/uicons" target="_blank" rel="noreferrer">
              UIcons par Flaticon
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
