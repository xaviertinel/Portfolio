import type { IconName } from '../design-system/icons'

export type ArticleMeta = { slug: string; title: string; kind: string; minutes: number; summary: string; icon: IconName }

export const articles: ArticleMeta[] = [
  { slug: 'impact-energie-vivant', title: "L'impact de l'énergie sur le vivant", kind: 'Analyse', minutes: 6, icon: 'leaf',
    summary: "Chaque filière exerce une pression différente sur la biodiversité. Tour d'horizon, filière par filière, et des mesures qui marchent." },
  { slug: 'je-suis-un-kwh', title: 'Je suis un kWh', kind: 'Récit', minutes: 4, icon: 'bolt',
    summary: "De la turbine à la bouilloire : le voyage d'un kilowattheure raconté à la première personne." },
  { slug: 'quiz-type-energie', title: "Quiz : quel type d'énergie êtes-vous ?", kind: 'Quiz', minutes: 2, icon: 'sparkles',
    summary: 'Six questions pour découvrir si vous êtes plutôt nucléaire, solaire, éolien ou hydraulique.' },
  { slug: 'carte-monde-energie', title: "La carte du monde de l'énergie", kind: 'Carte interactive', minutes: 3, icon: 'globe',
    summary: "L'intensité carbone de l'électricité, pays par pays, et ce qui l'explique." },
]
