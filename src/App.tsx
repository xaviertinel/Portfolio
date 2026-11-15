import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Chatbot } from './components/Chatbot'
import { ScrollProgress } from './components/effects'
import { GameHud, GameProvider } from './game/Game'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'
import Articles, { ArticleDetail } from './pages/Articles'
import Resources from './pages/Resources'

let lenis: Lenis | null = null

/** Défilement fluide (Lenis), coupé si l'utilisateur préfère réduire les animations. */
function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ autoRaf: true, duration: 1.05 })
    return () => {
      lenis?.destroy()
      lenis = null
    }
  }, [])
  return null
}

/** Remet la page en haut à chaque changement de route. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <GameProvider>
      <SmoothScroll />
      <ScrollToTop />
      <ScrollProgress />
      <a className="skip" href="#contenu">Aller au contenu</a>
      <Header />
      <main id="contenu">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets" element={<Work />} />
          <Route path="/projets/:slug" element={<ProjectDetail />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/ressources" element={<Resources />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <GameHud />
      <Chatbot />
    </GameProvider>
  )
}
