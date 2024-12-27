"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { DateRange } from "react-day-picker"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

interface DateRangePickerProps {
  className?: string
  date?: DateRange
  onDateChange?: (date: DateRange | undefined) => void
  align?: "start" | "center" | "end"
  children?: React.ReactNode
}

export function DateRangePicker({
  className,
  date,
  onDateChange,
  align = "center",
  children
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          {children || (
            <button
              className={cn(
                "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl",
                "bg-white border border-gray-100 text-gray-700",
                "hover:bg-gray-50 hover:border-gray-200 transition-colors"
              )}
            >
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium">
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "d 'de' MMM", { locale: es })} -{" "}
                      {format(date.to, "d 'de' MMM", { locale: es })}
                    </>
                  ) : (
                    format(date.from, "d 'de' MMM", { locale: es })
                  )
                ) : (
                  "Filtrar por fecha"
                )}
              </span>
            </button>
          )}
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-4 bg-white shadow-xl rounded-2xl border-gray-100"
          align={align}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={1}
            locale={es}
            className="bg-white"
            classNames={{
              months: "flex flex-col space-y-4",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center mb-2",
              caption_label: "text-sm font-medium text-gray-900",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                "h-7 w-7 bg-transparent p-0 hover:bg-gray-50",
                "inline-flex items-center justify-center rounded-lg",
                "text-gray-500 hover:text-gray-700 transition-colors"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem] mb-1",
              row: "flex w-full mt-2",
              cell: cn(
                "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              ),
              day: cn(
                "h-9 w-9 p-0 font-normal",
                "inline-flex items-center justify-center rounded-lg",
                "hover:bg-gray-50 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              ),
              day_range_start: "day-range-start bg-blue-600 text-white hover:bg-blue-600 hover:text-white rounded-lg",
              day_range_end: "day-range-end bg-blue-600 text-white hover:bg-blue-600 hover:text-white rounded-lg",
              day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white rounded-lg",
              day_today: "bg-gray-50 text-gray-900",
              day_outside: "text-gray-400 opacity-50 hover:bg-transparent",
              day_disabled: "text-gray-400 opacity-50 hover:bg-transparent",
              day_range_middle: "aria-selected:bg-blue-50 aria-selected:text-blue-900 hover:bg-blue-50 hover:text-blue-900",
              day_hidden: "invisible",
            }}
            components={{
              IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
              IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
} 