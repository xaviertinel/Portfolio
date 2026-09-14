import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { site } from '../data/site'

const NAV = [
  { to: '/', label: 'Accueil' },
  { to: '/projets', label: 'Projets' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
]

function useLocalClock() {
  const [stamp, setStamp] = useState({ time: '', date: '' })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setStamp({
        time: now.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: site.timeZone,
        }),
        date: now.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'short',
          timeZone: site.timeZone,
        }),
      })
    }
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return stamp
}

function Nav() {
  return (
    <nav className="nav__links" aria-label="Navigation principale">
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) => (isActive ? 'is-active' : undefined)}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export function Header() {
  const { time, date } = useLocalClock()
  const [pinned, setPinned] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 90) setPinned(false)
      else if (y < lastY.current) setPinned(true)
      else setPinned(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className="topbar">
        <div className="topbar__inner">
          <div className="topbar__id">
            <Link to="/" className="topbar__name">
              {site.shortName}
            </Link>
            <p className="topbar__meta">
              {date} — {time} · {site.city}
            </p>
          </div>
          <Nav />
        </div>
      </header>

      <motion.header
        className="topbar topbar--floating"
        initial={{ y: '-100%' }}
        animate={{ y: pinned ? 0 : '-100%' }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        aria-hidden={!pinned}
      >
        <div className="topbar__inner topbar__inner--tight">
          <Link to="/" className="topbar__name">
            {site.shortName}
          </Link>
          <Nav />
        </div>
      </motion.header>
    </>
  )
}
