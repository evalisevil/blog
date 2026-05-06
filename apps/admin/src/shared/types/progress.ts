import { type PROGRESS_VARIANTS } from '../constants/progress'

export type ProgressVariantType = (typeof PROGRESS_VARIANTS)[keyof typeof PROGRESS_VARIANTS]

export interface ProgressScoreType {
  label: string
  score: number
}

export interface ProgressGroupPropsType {
  scores: ProgressScoreType[]
}
