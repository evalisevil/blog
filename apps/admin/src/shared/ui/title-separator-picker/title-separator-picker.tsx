'use client'

import { useId } from 'react'

import { TITLE_SEPARATORS } from '@/shared/constants/title-separator'
import { cn } from '@/shared/lib'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/shadcn/toggle-group'

const SEPARATOR_ARIA: Record<keyof typeof TITLE_SEPARATORS, string> = {
  hyphen: 'Em dash',
  pipe: 'Vertical bar',
  dot: 'Middle dot',
  colon: 'Double colon',
}

export type TitleSeparatorPickerPropsType = {
  value: string
  onChange: (value: string) => void
  className?: string
}

export const TitleSeparatorPicker = ({
  value,
  onChange,
  className,
}: TitleSeparatorPickerPropsType) => {
  const labelId = useId()

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none tracking-tight" id={labelId}>
            타이틀 구분자
          </p>
          <p className="text-xs text-muted-foreground">
            검색 결과 제목에서 페이지명과 브랜드를 나누는 문자입니다.
          </p>
        </div>
      </div>

      <ToggleGroup
        aria-labelledby={labelId}
        className="justify-start"
        size="sm"
        type="single"
        value={value}
        variant="default"
        onValueChange={(next) => {
          if (next) onChange(next)
        }}
      >
        {(Object.entries(TITLE_SEPARATORS) as [keyof typeof TITLE_SEPARATORS, string][]).map(
          ([key, sep]) => (
            <ToggleGroupItem
              key={key}
              aria-label={SEPARATOR_ARIA[key]}
              className="flex-shrink-0 border-1"
              value={sep}
            >
              {sep}
            </ToggleGroupItem>
          ),
        )}
      </ToggleGroup>
    </div>
  )
}
