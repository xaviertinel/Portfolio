import { useState } from 'react'
import { Seg } from '../demos/ui'

const AXES = ['Emprise au sol', 'Mortalité directe', 'Fragmentation des milieux', 'Effet sur le climat']
const LEVEL = ['', 'Faible', 'Modérée', 'Forte']
const DATA = {
  eolien: { label: 'Éolien', levels: [1, 2, 1, 1],
    pressures: ['Collisions des oiseaux et des chauves-souris avec les pales', 'Dérangement pendant le chantier et effet de barrière sur les couloirs de migration', "En mer : bruit sous-marin lors de l'installation des fondations"],
    answers: ['Choisir le site en dehors des couloirs de migration', 'Brider les machines la nuit, par vent faible, quand les chauves-souris volent', 'Arrêter les turbines à la demande grâce à la détection par caméra ou radar'] },
  solaire: { label: 'Solaire au sol', levels: [3, 1, 2, 1],
    pressures: ['Consommation de surface et modification du couvert végétal', 'Clôtures qui coupent les déplacements de la petite faune', "Changement du microclimat sous les panneaux"],
    answers: ['Privilégier les toitures, les parkings et les sols déjà artificialisés', 'Prévoir des clôtures perméables à la petite faune', 'Gérer la végétation par fauche tardive ou pâturage'] },
  hydro: { label: 'Hydraulique', levels: [2, 2, 3, 1],
    pressures: ['Rupture de la continuité écologique : les poissons migrateurs ne passent plus', 'Modification des débits et du transport des sédiments', 'Ennoiement de vallées lors de la création de retenues'],
    answers: ['Passes à poissons et dispositifs de dévalaison', 'Débits réservés et lâchers qui imitent les crues naturelles', 'Turbines dites ichtyocompatibles'] },
  nucleaire: { label: 'Nucléaire', levels: [1, 1, 1, 1],
    pressures: ["Rejets thermiques qui réchauffent le cours d'eau ou la mer à l'aval", 'Aspiration d’organismes aquatiques aux prises d’eau', 'Emprise concentrée mais durable, mines comprises'],
    answers: ['Limites réglementaires de température de rejet, avec baisse de puissance si besoin', 'Grilles et dispositifs de répulsion aux prises d’eau', 'Suivi écologique de long terme autour des sites'] },
  reseau: { label: 'Réseaux électriques', levels: [1, 2, 2, 1],
    pressures: ['Collisions et électrocutions de grands oiseaux sur les lignes aériennes', 'Tranchées forestières sous les lignes', 'Des milliers de kilomètres : un effet diffus mais étendu'],
    answers: ['Balises sur les câbles et isolation des supports dangereux', 'Enfouissement des lignes dans les zones sensibles', 'Gestion des emprises en corridors de biodiversité'] },
  fossile: { label: 'Fossiles', levels: [2, 2, 2, 3],
    pressures: ['Changement climatique : la pression la plus large, sur tous les écosystèmes', 'Extraction, marées noires et pollution de l’air et de l’eau', 'Acidification des océans'],
    answers: ['La seule mesure à la hauteur : en sortir', 'Réhabiliter les sites d’extraction', 'Réduire les fuites de méthane pendant la transition'] },
}
type Key = keyof typeof DATA

export default function Vivant() {
  const [k, setK] = useState<Key>('eolien')
  const d = DATA[k]
  return (
    <>
      <p>Aucune façon de produire de l'électricité n'est neutre pour le vivant. La bonne question n'est donc pas « quelle énergie est propre ? » mais « quelle pression, où, et comment la réduire ? ». Car les pressions ne se ressemblent pas : une éolienne tue par collision, un barrage coupe une rivière, une centrale à charbon dérègle le climat de toute la planète.</p>
      <h2 className="xt-h2">Chaque filière a sa signature</h2>
      <p>Choisissez une filière pour voir ses pressions principales et les mesures qui les réduisent.</p>

      <div className="demo">
        <Seg label="Filière" value={k} onChange={setK} options={(Object.keys(DATA) as Key[]).map((id) => ({ id, label: DATA[id].label }))} />
        <div className="levels">
          {AXES.map((a, i) => (
            <div key={a} className="level">
              <span className="xt-small">{a}</span>
              <span className="level__dots" aria-label={LEVEL[d.levels[i]]}>
                {[1, 2, 3].map((n) => <span key={n} className={n <= d.levels[i] ? 'is-on' : ''} />)}
              </span>
              <strong>{LEVEL[d.levels[i]]}</strong>
            </div>
          ))}
        </div>
        <div className="two-col">
          <div>
            <h3 className="xt-eyebrow">Pressions</h3>
            <ul className="ticks ticks--warn">{d.pressures.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div>
            <h3 className="xt-eyebrow">Ce qui marche</h3>
            <ul className="ticks">{d.answers.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
      </div>
      <p className="xt-small">Niveaux de pression : lecture qualitative et indicative, à affiner avec la littérature scientifique.</p>

      <h2 className="xt-h2">Trois idées à retenir</h2>
      <p><strong>Le climat reste la première menace.</strong> Les impacts locaux des renouvelables sont réels, mais le changement climatique touche tous les écosystèmes à la fois. Décarboner vite protège aussi le vivant.</p>
      <p><strong>Le lieu compte plus que la technologie.</strong> Le même parc peut être anodin ici et désastreux deux vallées plus loin. L'essentiel se joue au moment de choisir le site : éviter d'abord, réduire ensuite, compenser en dernier recours.</p>
      <p><strong>Mesurer change tout.</strong> Suivi de mortalité, détection automatique, données ouvertes : ce qu'on mesure s'améliore. C'est aussi là que la data a un rôle à jouer.</p>
    </>
  )
}
