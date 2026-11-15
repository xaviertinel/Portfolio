import { useState } from 'react'
import { Icon } from '../design-system/Icon'
import type { IconName } from '../design-system/icons'

type T = 'N' | 'S' | 'E' | 'H'
const QUESTIONS: { q: string; a: [string, T][] }[] = [
  { q: 'Un lundi matin, vous êtes plutôt…', a: [['Au poste à 8 h pile, comme tous les jours', 'N'], ['En forme si le soleil est là', 'S'], ['Ça dépend du vent', 'E'], ['En réserve, prêt à tout donner au bon moment', 'H']] },
  { q: 'Votre façon de travailler en équipe ?', a: [['Je suis le socle : on compte sur moi', 'N'], ['Je rayonne, surtout à midi', 'S'], ["J'apporte de l'élan, par rafales", 'E'], ['Je régule : je comble les creux des autres', 'H']] },
  { q: 'Un imprévu tombe à 17 h 55.', a: [["J'ai une procédure pour ça", 'N'], ['Je verrai demain, à la lumière du jour', 'S'], ["Je change de cap dans l'instant", 'E'], ["J'ouvre les vannes : c'est réglé en dix minutes", 'H']] },
  { q: 'Vos vacances idéales ?', a: [['Au bord d’un fleuve, au calme', 'N'], ['Plein sud, sans un nuage', 'S'], ['Sur une côte bretonne, cheveux au vent', 'E'], ['En montagne, près d’un lac', 'H']] },
  { q: 'Ce qu’on vous reproche parfois ?', a: [['De mettre du temps à démarrer', 'N'], ['De disparaître la nuit', 'S'], ["D'être imprévisible", 'E'], ['De dépendre de la météo de l’an dernier', 'H']] },
  { q: 'Votre devise ?', a: [['La constance paie', 'N'], ['Simple, léger, partout', 'S'], ['Il faut saisir le bon courant', 'E'], ['Tout est question de timing', 'H']] },
]
const RESULTS: Record<T, { name: string; icon: IconName; text: string; mate: string }> = {
  N: { name: 'Nucléaire', icon: 'check', text: 'Vous êtes la base du système : stable, puissant, prévisible. On construit autour de vous. Vous n’aimez pas les changements de rythme, mais sur la durée personne ne vous bat.', mate: 'Votre binôme idéal : un profil hydraulique, pour la souplesse.' },
  S: { name: 'Solaire', icon: 'sun', text: 'Vous êtes modulaire, accessible et de plus en plus incontournable. Vos journées ont un pic très net. Vous donnez le meilleur de vous-même quand les conditions sont claires.', mate: 'Votre binôme idéal : une bonne batterie, pour tenir la soirée.' },
  E: { name: 'Éolien', icon: 'leaf', text: 'Vous captez l’énergie de ce qui bouge. Certains jours vous portez l’équipe à vous seul, d’autres vous êtes ailleurs. Bien prévu, vous êtes redoutable.', mate: 'Votre binôme idéal : un bon modèle de prévision.' },
  H: { name: 'Hydraulique', icon: 'bolt', text: 'Vous êtes la flexibilité incarnée. Vous stockez, vous attendez, et vous délivrez pile au moment où le système en a besoin. Tout le monde veut vous avoir dans son équipe.', mate: 'Votre binôme idéal : tout le monde, justement.' },
}

export default function Quiz() {
  const [answers, setAnswers] = useState<T[]>([])
  const step = answers.length
  const done = step === QUESTIONS.length

  if (done) {
    const count = (t: T) => answers.filter((a) => a === t).length
    const order = (['N', 'S', 'E', 'H'] as T[]).sort((a, b) => count(b) - count(a))
    const r = RESULTS[order[0]]
    return (
      <div className="demo quiz">
        <span className="quiz__badge"><Icon name={r.icon} size="lg" /></span>
        <p className="xt-eyebrow">Votre profil énergétique</p>
        <h2 className="xt-h2">{r.name}</h2>
        <p>{r.text}</p>
        <p className="xt-small">{r.mate}</p>
        <div className="quiz__mix" aria-label="Votre mix personnel">
          {order.filter((t) => count(t) > 0).map((t) => (
            <span key={t} style={{ flexGrow: count(t) }}>{RESULTS[t].name} {Math.round((count(t) / answers.length) * 100)}{' '}%</span>
          ))}
        </div>
        <button type="button" className="xt-btn xt-btn--secondary" onClick={() => setAnswers([])}>Refaire le quiz</button>
      </div>
    )
  }

  const { q, a } = QUESTIONS[step]
  return (
    <div className="demo quiz">
      <div className="quiz__progress" role="progressbar" aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-valuenow={step}>
        <span style={{ width: `${(step / QUESTIONS.length) * 100}%` }} />
      </div>
      <p className="xt-eyebrow">Question {step + 1} sur {QUESTIONS.length}</p>
      <h2 className="xt-h3">{q}</h2>
      <div className="quiz__answers">
        {a.map(([label, t]) => (
          <button key={label} type="button" className="lever" onClick={() => setAnswers((s) => [...s, t])}>
            <span className="lever__name">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
