import { type PROGRESS_VARIANTS } from '../constants/progress'

export type ProgressVariant = (typeof PROGRESS_VARIANTS)[keyof typeof PROGRESS_VARIANTS]

export interface ProgressScore {
  label: string
  score: number
}

export interface ProgressGroupProps {
  scores: ProgressScore[]
}
