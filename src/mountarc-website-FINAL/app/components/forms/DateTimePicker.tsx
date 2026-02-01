'use client'

import { useState, useRef, useEffect } from 'react'

// 1-hour time slots from 12:00 PM to 9:00 PM (range format)
const TIME_SLOTS = [
  { label: '12:00 PM - 1:00 PM', value: '12:00 PM - 1:00 PM' },
  { label: '1:00 PM - 2:00 PM', value: '1:00 PM - 2:00 PM' },
  { label: '2:00 PM - 3:00 PM', value: '2:00 PM - 3:00 PM' },
  { label: '3:00 PM - 4:00 PM', value: '3:00 PM - 4:00 PM' },
  { label: '4:00 PM - 5:00 PM', value: '4:00 PM - 5:00 PM' },
  { label: '5:00 PM - 6:00 PM', value: '5:00 PM - 6:00 PM' },
  { label: '6:00 PM - 7:00 PM', value: '6:00 PM - 7:00 PM' },
  { label: '7:00 PM - 8:00 PM', value: '7:00 PM - 8:00 PM' },
  { label: '8:00 PM - 9:00 PM', value: '8:00 PM - 9:00 PM' },
]

interface TimezoneOption {
  label: string
  value: string
  abbr: string
}

const TIMEZONES: TimezoneOption[] = [
  { label: 'India (IST)', value: 'Asia/Kolkata', abbr: 'IST' },
  { label: 'US - Eastern (ET)', value: 'America/New_York', abbr: 'ET' },
  { label: 'US - Central (CT)', value: 'America/Chicago', abbr: 'CT' },
  { label: 'US - Mountain (MT)', value: 'America/Denver', abbr: 'MT' },
  { label: 'US - Pacific (PT)', value: 'America/Los_Angeles', abbr: 'PT' },
  { label: 'UK (GMT/BST)', value: 'Europe/London', abbr: 'GMT' },
  { label: 'Canada - Eastern (ET)', value: 'America/Toronto', abbr: 'ET' },
  { label: 'Canada - Pacific (PT)', value: 'America/Vancouver', abbr: 'PT' },
  { label: 'Australia - Sydney (AEST)', value: 'Australia/Sydney', abbr: 'AEST' },
  { label: 'Australia - Perth (AWST)', value: 'Australia/Perth', abbr: 'AWST' },
  { label: 'New Zealand (NZST)', value: 'Pacific/Auckland', abbr: 'NZST' },
  { label: 'Saudi Arabia (AST)', value: 'Asia/Riyadh', abbr: 'AST' },
  { label: 'UAE (GST)', value: 'Asia/Dubai', abbr: 'GST' },
  { label: 'Singapore (SGT)', value: 'Asia/Singapore', abbr: 'SGT' },
]

function getNext14Weekdays(): Date[] {
  const dates: Date[] = []
  const today = new Date()
  const current = new Date(today)
  current.setDate(current.getDate() + 1) // start from tomorrow

  while (dates.length < 14) {
    const day = current.getDay()
    if (day !== 0 && day !== 6) {
      dates.push(new Date(current))
    }
    current.setDate(current.getDate() + 1)
  }
  return dates
}

function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function formatDateFull(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function isSameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

// Group dates by week for calendar-style layout
function groupByWeek(dates: Date[]): Date[][] {
  const weeks: Date[][] = []
  let currentWeek: Date[] = []

  for (const date of dates) {
    if (currentWeek.length > 0) {
      const lastDate = currentWeek[currentWeek.length - 1]
      if (date.getDay() <= lastDate.getDay()) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }
    currentWeek.push(date)
  }
  if (currentWeek.length > 0) weeks.push(currentWeek)
  return weeks
}

interface DateTimePickerProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export default function DateTimePicker({ value, onChange, error }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Kolkata')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  const weekdays = getNext14Weekdays()
  const weeks = groupByWeek(weekdays)

  const currentTz = TIMEZONES.find((tz) => tz.value === selectedTimezone) || TIMEZONES[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Update parent value when date, time, or timezone changes
  useEffect(() => {
    if (selectedDate && selectedTime) {
      onChange(`${formatDateFull(selectedDate)}, ${selectedTime} ${currentTz.abbr}`)
    } else if (selectedDate) {
      onChange(formatDateFull(selectedDate))
    } else {
      onChange('')
    }
  }, [selectedDate, selectedTime, selectedTimezone]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-3">
      {/* Timezone dropdown */}
      <div>
        <label className="block text-sm text-gray-500 mb-1">Your timezone</label>
        <select
          value={selectedTimezone}
          onChange={(e) => setSelectedTimezone(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint text-navy text-sm"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>

      {/* Date picker */}
      <div>
        <label className="block text-sm text-gray-500 mb-1">Preferred date</label>
        <div className="relative" ref={calendarRef}>
          <button
            type="button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-mint ${
              error && !selectedDate ? 'border-red-300' : 'border-gray-300'
            } ${selectedDate ? 'text-navy' : 'text-gray-400'}`}
          >
            <span>{selectedDate ? formatDateShort(selectedDate) : 'Select a date'}</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>

          {isCalendarOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 w-full">
              <p className="text-xs text-gray-500 mb-2 text-center">Next 14 weekdays (Mon-Fri)</p>

              {/* Weekday headers */}
              <div className="grid grid-cols-5 gap-1 mb-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Date grid */}
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-5 gap-1">
                  {/* Fill empty slots for incomplete weeks */}
                  {week.length > 0 &&
                    Array.from({ length: week[0].getDay() - 1 }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                  {week.map((date) => {
                    const isSelected = selectedDate && isSameDate(date, selectedDate)
                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => {
                          setSelectedDate(date)
                          setIsCalendarOpen(false)
                        }}
                        className={`py-2 px-1 rounded-lg text-sm text-center transition-colors ${
                          isSelected
                            ? 'bg-mint text-white font-medium'
                            : 'text-navy hover:bg-mint/10'
                        }`}
                      >
                        <div className="font-medium">{date.getDate()}</div>
                        <div className="text-xs opacity-70">
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Time slot dropdown */}
      <div>
        <label className="block text-sm text-gray-500 mb-1">Preferred time</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mint ${
            error && !selectedTime ? 'border-red-300' : 'border-gray-300'
          } ${selectedTime ? 'text-navy' : 'text-gray-400'}`}
        >
          <option value="">Select a time slot</option>
          {TIME_SLOTS.map((slot) => (
            <option key={slot.value} value={slot.value} className="text-navy">
              {slot.label} {currentTz.abbr}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
