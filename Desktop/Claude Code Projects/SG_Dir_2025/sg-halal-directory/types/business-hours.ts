// TypeScript types for Business Hours

export interface DayHours {
  open: string | null  // HH:MM format (24-hour)
  close: string | null  // HH:MM format (24-hour)
  closed: boolean
}

export interface BusinessHours {
  monday: DayHours
  tuesday: DayHours
  wednesday: DayHours
  thursday: DayHours
  friday: DayHours
  saturday: DayHours
  sunday: DayHours
}

export interface SpecialHours {
  id?: string
  business_id: string
  date: string  // YYYY-MM-DD
  open_time: string | null  // HH:MM format
  close_time: string | null  // HH:MM format
  is_closed: boolean
  reason: string | null  // "Hari Raya", "Renovation", etc.
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export interface OpenStatus {
  is_open: boolean
  message: string  // "Open now", "Closed", "Opens at 9:00 AM", "Closes at 6:00 PM"
  next_change?: string  // Time of next status change
}

// Default business hours (9am - 6pm weekdays, 10am - 4pm Saturday, closed Sunday)
export const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  monday: { open: '09:00', close: '18:00', closed: false },
  tuesday: { open: '09:00', close: '18:00', closed: false },
  wednesday: { open: '09:00', close: '18:00', closed: false },
  thursday: { open: '09:00', close: '18:00', closed: false },
  friday: { open: '09:00', close: '18:00', closed: false },
  saturday: { open: '10:00', close: '16:00', closed: false },
  sunday: { open: null, close: null, closed: true },
}
