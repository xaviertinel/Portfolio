import { Icon } from '../design-system/Icon'
import type { IconName } from '../design-system/icons'
import { Reveal } from '../components/motion'

const STEPS: { time: string; title: string; icon: IconName; text: string }[] = [
  { time: 'T + 0 ms', title: 'Je nais dans un alternateur', icon: 'sparkles',
    text: "Tout commence par un mouvement. De la vapeur, du vent ou de l'eau fait tourner une turbine, la turbine entraîne un aimant, et me voilà : mille watts pendant une heure, autant dire pas grand-chose. Personne ne me voit, personne ne m'a commandé. Sur un réseau, on produit à chaque instant exactement ce qui se consomme." },
  { time: 'T + 1 ms', title: 'On me monte à 400 000 volts', icon: 'chart-line-up',
    text: "À peine né, on m'élève. Un transformateur me porte à très haute tension. Ce n'est pas par orgueil : plus la tension est haute, moins je me perds en chaleur dans les câbles. Je file sur les grandes lignes, celles qui enjambent les vallées." },
  { time: 'T + 3 ms', title: 'Je traverse le pays', icon: 'globe',
    text: "Je ne choisis pas ma route. Je vais là où l'on m'appelle, par le chemin de moindre résistance. Les frontières ne m'arrêtent pas : les réseaux européens battent au même rythme, cinquante fois par seconde. En route, quelques-uns d'entre nous se dissipent. Les pertes font partie du voyage." },
  { time: 'T + 6 ms', title: 'Je redescends, palier par palier', icon: 'database',
    text: "Poste source, moyenne tension, puis le petit transformateur au coin de votre rue. À chaque étape, on me ramène à une taille plus humaine. Je passe sous les trottoirs, je longe les façades." },
  { time: 'T + 9 ms', title: 'Un compteur me voit passer', icon: 'search',
    text: "C'est mon seul instant de gloire administrative : je suis compté. Une ligne sur une facture, quelques centimes. Beaucoup de data scientists gagnent leur vie à prédire combien nous serons demain à passer par ici." },
  { time: 'T + 10 ms', title: 'Je deviens autre chose', icon: 'bolt',
    text: "Je ne disparais pas, je me transforme. Chaleur dans une bouilloire : de quoi porter dix litres d'eau à ébullition. Mouvement dans une voiture électrique : cinq ou six kilomètres. Lumière, calcul, musique. Ce que vous faites de moi, c'est votre affaire. Mais sachez d'où je viens : c'est ce qui décide de mon poids en carbone." },
]

export default function Kwh() {
  return (
    <>
      <p>On parle de moi tous les jours, en milliards, sur des graphiques. On me mesure, on me taxe, on me prévoit. Mais personne ne m'a jamais demandé de raconter mon voyage. Il dure à peine dix millisecondes. Le voici.</p>
      <ol className="story">
        {STEPS.map((s, i) => (
          <li key={s.title} className="story__step">
            <Reveal delay={i === 0 ? 0 : 0.05}>
              <span className="story__icon"><Icon name={s.icon} /></span>
              <span className="story__time">{s.time}</span>
              <h2 className="xt-h3">{s.title}</h2>
              <p>{s.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
      <p><strong>Morale de l'histoire :</strong> un kWh n'a ni couleur ni odeur à l'arrivée. Tout ce qui le distingue s'est joué au départ, dans la façon de le produire, et à l'arrivée, dans ce qu'on en fait. Entre les deux, il ne fait que passer.</p>
      <p className="xt-small">Ordres de grandeur : environ 0,1 kWh pour porter un litre d'eau à ébullition, 15 à 20 kWh aux 100 km pour une voiture électrique.</p>
    </>
  )
}
