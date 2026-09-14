/** Bandeau défilant en boucle. Le contenu est dupliqué pour un défilement continu. */
export function Marquee({ items }: { items: string[] }) {
  const track = [...items, ...items]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {track.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <span className="marquee__dot">◦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
