'use client'

import { formatDate } from 'date-fns'
import * as React from 'react'

import { Button } from './shadcn/button'
import { Calendar } from './shadcn/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './shadcn/popover'

export const DatePicker = ({
  value,
  onChange,
}: {
  value: Date
  onChange: (date: Date) => void
}) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="justify-start bg-white" id="date" variant="outline">
          {value ? formatDate(value, 'yyyy.MM.dd') : '날짜 선택'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto overflow-hidden p-0">
        <Calendar
          required
          captionLayout="dropdown"
          defaultMonth={value ?? new Date()}
          mode="single"
          selected={value ?? new Date()}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  )
}
