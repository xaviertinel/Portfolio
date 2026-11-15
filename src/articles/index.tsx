import type { ComponentType } from 'react'
import Vivant from './Vivant'
import Kwh from './Kwh'
import Quiz from './Quiz'
import WorldMap from './WorldMap'

export const articleBodies: Record<string, ComponentType> = {
  'impact-energie-vivant': Vivant,
  'je-suis-un-kwh': Kwh,
  'quiz-type-energie': Quiz,
  'carte-monde-energie': WorldMap,
}
