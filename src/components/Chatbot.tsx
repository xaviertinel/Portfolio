import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../design-system/Icon'
import { site } from '../data/site'
import { projects, type Project } from '../data/projects'
import { articles } from '../data/articles'
import { useGame } from '../game/Game'
import { CV_FILENAME, cvUrl } from '../lib/assets'
import { norm } from '../lib/util'

/** Ce que le bot peut joindre à une réponse : boutons, cartes projet, chiffres, liste. */
type Action = { label: string; to?: string; href?: string; say?: string; download?: boolean; game?: boolean }
type Reply = { text: string; actions?: Action[]; cards?: Project[]; kpis?: { value: string; label: string }[]; list?: string[] }
type Msg = Reply & { from: 'bot' | 'me' }

const SUGGESTIONS = ['Qui est Xavier ?', 'Ses projets', 'Ses compétences', 'Son parcours', 'Télécharger le CV', 'Le contacter']

const PROJECT_KEYS: [RegExp, string][] = [
  [/maintenance|nucleaire|tableau de bord|power ?bi|dashboard|\bbi\b|visualisation/, 'pilotage-maintenance'],
  [/flotte|vehicule|tco|electrif|mobilite/, 'electrification-flotte'],
  [/rapprochement|comptab|actif|financ|nettoyage|qualite de donnee/, 'rapprochement-actifs'],
  [/eolien|vent|machine learning|\bml\b|modele predictif/, 'prevision-eolien'],
  [/consommation|2030|econometr|statisti|scenario|prevision/, 'prevision-consommation'],
  [/carbone|trajectoire|ges\b|bilan|decarbon/, 'trajectoire-carbone'],
  [/mathware|calcul mental/, 'mathware'],
]

const contactActions: Action[] = [
  { label: 'Écrire un e-mail', href: `mailto:${site.email}` },
  ...site.links.map((l) => ({ label: l.label, href: l.url })),
]

/** Moteur de réponses : règles locales, aucune donnée n'est envoyée à un serveur. */
function answer(raw: string): Reply {
  const q = norm(raw)
  const has = (re: RegExp) => re.test(q)

  if (has(/\bcv\b|curriculum|telecharg/))
    return { text: 'Voici le CV de Xavier, au format PDF.', actions: [{ label: 'Télécharger le CV', href: cvUrl, download: true }, { label: 'Voir le parcours', to: '/a-propos' }] }
  if (has(/mode jeu|jouer|\bjeu\b|game|kwh cache|chasse/))
    return { text: 'Le mode jeu cache des éclairs dorés dans tout le site. Chaque éclair recharge la batterie. Prêt ?', actions: [{ label: 'Activer ou couper le mode jeu', game: true }] }

  const hit = PROJECT_KEYS.find(([re]) => re.test(q))
  if (hit) {
    const p = projects.find((x) => x.slug === hit[1])!
    return {
      text: `${p.title}. ${p.intro}`,
      kpis: p.impact ? [p.impact] : undefined,
      list: p.highlights.slice(0, 3),
      actions: [{ label: 'Ouvrir la démo interactive', to: `/projets/${p.slug}` }, { label: 'Autres projets', say: 'Ses projets' }],
    }
  }
  if (has(/projet|realisation|portfolio|demo|travaux|mission/))
    return { text: `Xavier présente ${projects.length} projets. Chacun a sa démo interactive sur données synthétiques, donc anonymisées.`, cards: projects.slice(0, 4), actions: [{ label: 'Tous les projets', to: '/projets' }] }
  if (has(/ressource|outil gratuit|calculat|convert|simulateur/))
    return { text: 'La page Ressources regroupe de petits outils gratuits : conversion d’énergie, CO₂ d’un trajet, coût de recharge, intervalle de confiance, statistiques d’un CSV.', actions: [{ label: 'Ouvrir les ressources', to: '/ressources' }] }
  if (has(/article|quiz|blog|lire|carte du monde|vivant|biodiversite/))
    return { text: 'Quatre articles, dont deux interactifs :', actions: articles.map((a) => ({ label: a.title, to: `/articles/${a.slug}` })) }
  if (has(/starter|objet|casque|sabre|lapin|tesseract|ceinture|clavier|sceau/))
    return { text: 'Le starter pack résume Xavier en neuf objets, du casque de chantier au tesseract. Chaque objet a son histoire.', actions: [{ label: 'Découvrir le starter pack', to: '/a-propos' }] }
  if (has(/competence|skill|outil|stack|techno|python|sql|sait faire|maitrise/))
    return { text: 'Ses compétences, par famille :', list: site.skills.map((s) => `${s.label} : ${s.items.join(', ')}`), actions: [{ label: 'Les voir en action', say: 'Ses projets' }] }
  if (has(/formation|ecole|diplome|etude|centrale|escp|ingenieur/))
    return { text: 'Un double diplôme, ingénieur et management :', list: site.education.map((e) => `${e.title}, ${e.org} (${e.date}). ${e.note}`), actions: [{ label: 'Ses certifications', say: 'Ses certifications' }] }
  if (has(/certif|mooc|cours en ligne/))
    return { text: 'Ses certifications :', list: site.certifications }
  if (has(/langue|espagnol|anglais|bilingue|francais/))
    return { text: 'Côté langues :', list: site.languages }
  if (has(/passion|hobby|loisir|judo|animal|guitare|association|sport|benevol/))
    return { text: 'En dehors du travail :', list: site.passions }
  if (has(/parcours|experience|carriere|poste|travaille|metier/))
    return {
      text: 'Cinq ans entre data science et conseil en stratégie, toujours dans l’énergie.',
      kpis: site.kpis.slice(0, 3).map((k) => ({ value: `${k.value}${k.suffix}`, label: k.label })),
      list: site.experience.slice(0, 4).map((e) => `${e.date} : ${e.title}, ${e.org.toLowerCase()}`),
      actions: [{ label: 'Parcours complet', to: '/a-propos' }, { label: 'Télécharger le CV', href: cvUrl, download: true }],
    }
  if (has(/contact|email|e-mail|mail|joindre|linkedin|recrut|embauch|dispo|entretien|telephone|appeler/))
    return { text: 'Le plus simple est de lui écrire. Il répond vite.', actions: contactActions }
  if (has(/\bou (est|vit|habite|travaille)|ville|paris|habite|localis|teletravail/))
    return { text: `Xavier est basé à ${site.city}.`, actions: contactActions.slice(0, 1) }
  if (has(/bonjour|salut|hello|coucou|bonsoir|hey/))
    return { text: 'Bonjour ! Que voulez-vous savoir sur Xavier ?', actions: SUGGESTIONS.slice(0, 4).map((s) => ({ label: s, say: s })) }
  if (has(/merci|super|genial|top|parfait/))
    return { text: 'Avec plaisir. Autre chose ?', actions: [{ label: 'Le contacter', say: 'Le contacter' }] }
  if (has(/qui|xavier|present|profil|resume|toi|parle/))
    return { text: site.intro, kpis: site.kpis.slice(0, 2).map((k) => ({ value: `${k.value}${k.suffix}`, label: k.label })), actions: [{ label: 'Son parcours', say: 'Son parcours' }, { label: 'Ses projets', say: 'Ses projets' }] }

  return {
    text: 'Je n’ai pas la réponse à cette question. Je connais ses projets, ses compétences, son parcours, sa formation et ses articles.',
    actions: [...SUGGESTIONS.slice(1, 4).map((s) => ({ label: s, say: s })), { label: 'Lui poser la question', href: `mailto:${site.email}` }],
  }
}

const HELLO: Msg = {
  from: 'bot',
  text: 'Bonjour ! Je suis l’assistant de ce portfolio. Posez-moi une question sur Xavier, ses projets ou son parcours.',
  actions: SUGGESTIONS.map((s) => ({ label: s, say: s })),
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([HELLO])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const end = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLInputElement>(null)
  const game = useGame()

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'end' })
  }, [msgs, typing, open])
  useEffect(() => {
    if (open) field.current?.focus()
  }, [open])

  const say = (text: string) => {
    const t = text.trim()
    if (!t || typing) return
    setMsgs((m) => [...m, { from: 'me', text: t }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMsgs((m) => [...m, { from: 'bot', ...answer(t) }])
      setTyping(false)
    }, 650)
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    say(input)
  }

  const renderAction = (a: Action) => {
    if (a.to) return <Link key={a.label} to={a.to} className="chip chip--go" onClick={() => setOpen(false)}>{a.label}<Icon name="arrow-right" size="sm" /></Link>
    if (a.href)
      return (
        <a key={a.label} href={a.href} className="chip chip--go"
          {...(a.download ? { download: CV_FILENAME } : a.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {a.label}<Icon name={a.download ? 'download' : 'arrow-up-right'} size="sm" />
        </a>
      )
    if (a.game) return <button key={a.label} type="button" className="chip chip--go" onClick={game.toggle}>{game.on ? 'Couper le mode jeu' : 'Activer le mode jeu'}<Icon name="rocket-lunch" size="sm" /></button>
    return <button key={a.label} type="button" className="chip" onClick={() => say(a.say ?? a.label)}>{a.label}</button>
  }

  return (
    <>
      <button type="button" className={`orb-btn${open ? ' is-open' : ''}`} onClick={() => setOpen((v) => !v)}
        aria-expanded={open} aria-label={open ? 'Fermer l’assistant' : 'Ouvrir l’assistant'}>
        <span className="orb" aria-hidden="true" />
        {open ? <Icon name="cross" size="sm" /> : <span className="orb-btn__label">Une question ?</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.section className="chat beam" role="dialog" aria-label="Assistant du portfolio"
            initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }} transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}>
            <header className="chat__head">
              <span className={`orb orb--sm${typing ? ' is-thinking' : ''}`} aria-hidden="true" />
              <div>
                <strong>Assistant de Xavier</strong>
                <p className="xt-small">Réponses scriptées, calculées dans votre navigateur</p>
              </div>
            </header>

            <div className="chat__body" data-lenis-prevent aria-live="polite">
              {msgs.map((m, i) => (
                <motion.div key={i} className={`bubble bubble--${m.from}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  <p>{m.text}</p>
                  {m.kpis && (
                    <div className="bubble__kpis">
                      {m.kpis.map((k) => (
                        <div key={k.label}><strong>{k.value}</strong><span>{k.label}</span></div>
                      ))}
                    </div>
                  )}
                  {m.list && <ul className="bubble__list">{m.list.map((l) => <li key={l}>{l}</li>)}</ul>}
                  {m.cards && (
                    <div className="bubble__cards">
                      {m.cards.map((p) => (
                        <Link key={p.slug} to={`/projets/${p.slug}`} className="mini-card" onClick={() => setOpen(false)}>
                          <span className="mini-card__icon"><Icon name={p.icon} size="sm" /></span>
                          <span><strong>{p.title}</strong><small>{p.quality}</small></span>
                        </Link>
                      ))}
                    </div>
                  )}
                  {m.actions && <div className="bubble__actions">{m.actions.map(renderAction)}</div>}
                </motion.div>
              ))}
              {typing && (
                <div className="bubble bubble--bot bubble--typing" aria-label="L’assistant écrit">
                  <span /><span /><span />
                </div>
              )}
              <div ref={end} />
            </div>

            <form className="chat__form" onSubmit={submit}>
              <input ref={field} className="field" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Votre question…" aria-label="Votre question" />
              <button type="submit" className="xt-btn xt-btn--primary xt-btn--icon" aria-label="Envoyer" disabled={!input.trim() || typing}>
                <Icon name="arrow-right" size="sm" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
