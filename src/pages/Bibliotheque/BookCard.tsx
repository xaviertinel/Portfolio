import { useState } from 'react'
import type { Book } from '../../data/books'

function Stars({ rating }: { rating: number }) {
  if (!rating) return <span className="book__unrated">Non noté</span>
  return (
    <span className="book__stars" aria-label={`${rating} sur 5`}>
      {'★'.repeat(rating)}
      <span className="book__stars-empty">{'★'.repeat(5 - rating)}</span>
    </span>
  )
}

export function BookCard({ book }: { book: Book }) {
  const [broken, setBroken] = useState(false)
  const showCover = book.cover && !broken

  return (
    <article className="book">
      <div className="book__cover">
        {showCover ? (
          <img
            src={book.cover}
            alt={`Couverture de ${book.title}`}
            loading="lazy"
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="book__placeholder" aria-hidden="true">
            {book.title.charAt(0)}
          </div>
        )}
      </div>

      <div className="book__body">
        <div className="book__head">
          <h3 className="book__title">{book.title}</h3>
          <span className="book__year">{book.year}</span>
        </div>
        <p className="book__author">{book.author}</p>

        <ul className="book__genres">
          {book.genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>

        <p className="book__note">{book.note}</p>
        <Stars rating={book.rating} />
      </div>
    </article>
  )
}
