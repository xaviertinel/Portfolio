import type { ComponentType } from 'react'
import type { DemoKey } from '../data/projects'
import Bi from './Bi'
import Tco from './Tco'
import Matching from './Matching'
import Wind from './Wind'
import Forecast from './Forecast'
import Trajectory from './Trajectory'
import MathGame from './MathGame'

export const demos: Record<DemoKey, ComponentType> = {
  bi: Bi, tco: Tco, matching: Matching, wind: Wind, forecast: Forecast, trajectory: Trajectory, math: MathGame,
}
