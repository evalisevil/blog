import { PROGRESS_VARIANTS } from '@/shared/constants/progress'
import { type ProgressGroupProps, type ProgressScore } from '@/shared/types/progress'
import { Progress } from '@/shared/ui/shadcn/progress'

export const ProgressGroup = ({ scores }: ProgressGroupProps) => {
  const getVariant = ({ score }: Pick<ProgressScore, 'score'>) => {
    if (score >= 90) return PROGRESS_VARIANTS.success
    if (score >= 70) return PROGRESS_VARIANTS.warning

    return PROGRESS_VARIANTS.destructive
  }

  return (
    <div className="flex flex-col gap-y-2">
      {scores.map((score) => (
        <div key={score.label} className="flex flex-col gap-y-1">
          <span className="text-sm font-medium">{score.label}</span>
          <div className="flex items-center gap-x-2">
            <Progress key={score.label} value={score.score} variant={getVariant(score)} />
            <span className="text-sm font-medium">{score.score}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
