import { useState } from 'react'
import { fmt } from '../lib/util'
import { Tile } from '../demos/ui'

// Ordres de grandeur indicatifs (gCO2e/kWh), à remplacer par des données sourcées (Ember, AIE).
// c / r = colonne et ligne sur la grille : un pays = une tuile.
const COUNTRIES: { id: string; name: string; c: number; r: number; g: number; main: string }[] = [
  { id: 'CA', name: 'Canada', c: 2, r: 1, g: 130, main: 'hydraulique' }, { id: 'US', name: 'États-Unis', c: 2, r: 2, g: 370, main: 'gaz' },
  { id: 'MX', name: 'Mexique', c: 2, r: 3, g: 420, main: 'gaz' }, { id: 'BR', name: 'Brésil', c: 4, r: 5, g: 100, main: 'hydraulique' },
  { id: 'CL', name: 'Chili', c: 3, r: 6, g: 290, main: 'renouvelables et charbon' }, { id: 'AR', name: 'Argentine', c: 4, r: 6, g: 340, main: 'gaz' },
  { id: 'NO', name: 'Norvège', c: 7, r: 0, g: 30, main: 'hydraulique' }, { id: 'SE', name: 'Suède', c: 8, r: 0, g: 40, main: 'hydraulique et nucléaire' },
  { id: 'GB', name: 'Royaume-Uni', c: 6, r: 1, g: 230, main: 'gaz et éolien' }, { id: 'DE', name: 'Allemagne', c: 8, r: 1, g: 380, main: 'éolien et charbon' },
  { id: 'PL', name: 'Pologne', c: 9, r: 1, g: 660, main: 'charbon' }, { id: 'FR', name: 'France', c: 7, r: 2, g: 55, main: 'nucléaire' },
  { id: 'ES', name: 'Espagne', c: 6, r: 3, g: 170, main: 'éolien et solaire' }, { id: 'IT', name: 'Italie', c: 8, r: 3, g: 330, main: 'gaz' },
  { id: 'MA', name: 'Maroc', c: 6, r: 4, g: 620, main: 'charbon' }, { id: 'EG', name: 'Égypte', c: 9, r: 4, g: 470, main: 'gaz' },
  { id: 'ZA', name: 'Afrique du Sud', c: 9, r: 6, g: 710, main: 'charbon' }, { id: 'TR', name: 'Turquie', c: 10, r: 3, g: 440, main: 'charbon et gaz' },
  { id: 'SA', name: 'Arabie saoudite', c: 10, r: 4, g: 600, main: 'gaz et pétrole' }, { id: 'RU', name: 'Russie', c: 11, r: 1, g: 440, main: 'gaz' },
  { id: 'IN', name: 'Inde', c: 11, r: 4, g: 710, main: 'charbon' }, { id: 'CN', name: 'Chine', c: 12, r: 2, g: 580, main: 'charbon' },
  { id: 'JP', name: 'Japon', c: 13, r: 2, g: 480, main: 'gaz et charbon' }, { id: 'ID', name: 'Indonésie', c: 12, r: 5, g: 680, main: 'charbon' },
  { id: 'AU', name: 'Australie', c: 13, r: 6, g: 550, main: 'charbon' },
]
const band = (g: number) => (g < 100 ? 1 : g < 250 ? 2 : g < 450 ? 3 : g < 600 ? 4 : 5)
const BANDS = ['', 'moins de 100', '100 à 250', '250 à 450', '450 à 600', 'plus de 600']

export default function WorldMap() {
  const [id, setId] = useState('FR')
  const cur = COUNTRIES.find((c) => c.id === id)!
  const kettle = cur.g * 0.1 // un litre d'eau bouillie ≈ 0,1 kWh
  const ev = cur.g * 0.17 // 1 km en voiture électrique ≈ 0,17 kWh

  return (
    <>
      <p>Un kWh n'a pas le même poids en carbone selon l'endroit où il est produit. Entre le pays le plus sobre et le plus carboné de cette carte, l'écart dépasse un facteur vingt. Cliquez sur un pays.</p>
      <div className="demo">
        <div className="worldmap" role="group" aria-label="Carte du monde en tuiles">
          {COUNTRIES.map((c) => (
            <button key={c.id} type="button" className={`worldmap__tile worldmap__tile--${band(c.g)}`} aria-pressed={c.id === id}
              style={{ gridColumn: c.c + 1, gridRow: c.r + 1 }} onClick={() => setId(c.id)} aria-label={`${c.name}, ${c.g} grammes de CO2 par kWh`}>
              {c.id}
            </button>
          ))}
        </div>
        <p className="demo__legend">
          {[1, 2, 3, 4, 5].map((b) => (
            <span key={b} className="worldmap__key"><span className={`worldmap__tile--${b}`} />{BANDS[b]}</span>
          ))}
          <span>gCO₂e/kWh</span>
        </p>
        <h2 className="xt-h3">{cur.name}</h2>
        <div className="demo__kpis">
          <Tile tone="blue" label="Intensité carbone de l'électricité" value={`${fmt(cur.g)} g/kWh`} />
          <Tile label="Source dominante" value={cur.main} />
          <Tile label="Un litre d'eau bouillie" value={`${fmt(kettle, 1)} g CO₂e`} />
          <Tile tone="gold" label="Un km en voiture électrique" value={`${fmt(ev)} g CO₂e`} />
        </div>
      </div>
      <p className="xt-small">Valeurs arrondies, données à titre indicatif. Elles varient d'une année et même d'une heure à l'autre.</p>
      <h2 className="xt-h2">Ce que la carte raconte</h2>
      <p><strong>La géographie aide, mais ne décide pas.</strong> Les pays les plus sobres ont souvent des montagnes et de l'eau. Mais d'autres y sont arrivés par des choix industriels : le nucléaire hier, l'éolien et le solaire aujourd'hui.</p>
      <p><strong>Électrifier n'a pas le même effet partout.</strong> Une voiture électrique reste presque toujours meilleure qu'une thermique sur son cycle de vie, mais son avantage dépend beaucoup du réseau qui la recharge. D'où l'importance de décarboner la production en même temps que les usages.</p>
      <p><strong>Le charbon pèse lourd.</strong> Les tuiles les plus sombres ont un point commun : une production dominée par le charbon. C'est là que chaque nouveau parc renouvelable évite le plus d'émissions.</p>
    </>
  )
}
