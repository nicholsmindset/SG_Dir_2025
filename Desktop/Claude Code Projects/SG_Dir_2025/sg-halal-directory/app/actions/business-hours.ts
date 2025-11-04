'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { BusinessHours, SpecialHours, OpenStatus, DEFAULT_BUSINESS_HOURS } from '@/types/business-hours'

/**
 * Update business hours for a claimed business
 */
export async function updateBusinessHours(businessId: string, hours: BusinessHours) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Verify user owns this business
  const { data: business, error: businessError } = await supabase
    .from('businesses')
    .select('id, claimed_by')
    .eq('id', businessId)
    .single()

  if (businessError || !business) {
    return {
      success: false,
      error: 'Business not found'
    }
  }

  if (business.claimed_by !== user.id) {
    return {
      success: false,
      error: 'You can only update hours for your own business'
    }
  }

  // Update the hours
  const { error: updateError } = await supabase
    .from('businesses')
    .update({ business_hours: hours as any })
    .eq('id', businessId)

  if (updateError) {
    console.error('Error updating business hours:', updateError)
    return {
      success: false,
      error: 'Failed to update business hours'
    }
  }

  revalidatePath(`/business/${businessId}`)
  revalidatePath(`/dashboard/edit/${businessId}`)

  return {
    success: true
  }
}

/**
 * Get business hours for a business
 */
export async function getBusinessHours(businessId: string): Promise<BusinessHours | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('businesses')
    .select('business_hours')
    .eq('id', businessId)
    .single()

  if (error || !data) {
    console.error('Error fetching business hours:', error)
    return DEFAULT_BUSINESS_HOURS
  }

  return (data.business_hours as BusinessHours) || DEFAULT_BUSINESS_HOURS
}

/**
 * Add special hours (holidays, exceptions)
 */
export async function addSpecialHours(businessId: string, specialHours: Omit<SpecialHours, 'id'>) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Verify user owns this business
  const { data: business } = await supabase
    .from('businesses')
    .select('id, claimed_by')
    .eq('id', businessId)
    .single()

  if (!business || business.claimed_by !== user.id) {
    return {
      success: false,
      error: 'You can only update hours for your own business'
    }
  }

  // Add special hours
  const { error } = await supabase
    .from('special_hours')
    .insert({
      ...specialHours,
      business_id: businessId
    })

  if (error) {
    console.error('Error adding special hours:', error)
    return {
      success: false,
      error: 'Failed to add special hours'
    }
  }

  revalidatePath(`/business/${businessId}`)

  return {
    success: true
  }
}

/**
 * Update special hours
 */
export async function updateSpecialHours(specialHoursId: string, updates: Partial<Omit<SpecialHours, 'id' | 'business_id'>>) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Verify user owns the business
  const { data: specialHours } = await supabase
    .from('special_hours')
    .select(`
      id,
      business_id,
      businesses!inner (
        claimed_by
      )
    `)
    .eq('id', specialHoursId)
    .single()

  // @ts-ignore
  if (!specialHours || specialHours.businesses.claimed_by !== user.id) {
    return {
      success: false,
      error: 'Access denied'
    }
  }

  const { error } = await supabase
    .from('special_hours')
    .update(updates)
    .eq('id', specialHoursId)

  if (error) {
    return {
      success: false,
      error: 'Failed to update special hours'
    }
  }

  revalidatePath(`/business/${specialHours.business_id}`)

  return {
    success: true
  }
}

/**
 * Delete special hours
 */
export async function deleteSpecialHours(specialHoursId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return {
      success: false,
      error: 'Authentication required'
    }
  }

  // Verify user owns the business
  const { data: specialHours } = await supabase
    .from('special_hours')
    .select(`
      id,
      business_id,
      businesses!inner (
        claimed_by
      )
    `)
    .eq('id', specialHoursId)
    .single()

  // @ts-ignore
  if (!specialHours || specialHours.businesses.claimed_by !== user.id) {
    return {
      success: false,
      error: 'Access denied'
    }
  }

  const { error } = await supabase
    .from('special_hours')
    .delete()
    .eq('id', specialHoursId)

  if (error) {
    return {
      success: false,
      error: 'Failed to delete special hours'
    }
  }

  revalidatePath(`/business/${specialHours.business_id}`)

  return {
    success: true
  }
}

/**
 * Get special hours for a business
 */
export async function getSpecialHours(businessId: string, fromDate?: string): Promise<SpecialHours[]> {
  const supabase = await createClient()

  let query = supabase
    .from('special_hours')
    .select('*')
    .eq('business_id', businessId)
    .order('date', { ascending: true })

  if (fromDate) {
    query = query.gte('date', fromDate)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching special hours:', error)
    return []
  }

  return data as SpecialHours[]
}

/**
 * Check if business is open now
 */
export async function isBusinessOpenNow(businessId: string): Promise<OpenStatus> {
  const supabase = await createClient()

  // Use the database function
  const { data, error } = await supabase.rpc('is_business_open_now', {
    business_id_param: businessId
  })

  if (error) {
    console.error('Error checking if business is open:', error)
    return {
      is_open: false,
      message: 'Unable to determine status'
    }
  }

  const isOpen = data as boolean

  // Get more detailed status message
  const hours = await getBusinessHours(businessId)
  if (!hours) {
    return {
      is_open: false,
      message: 'Hours not available'
    }
  }

  // Get current day and time in Singapore timezone
  const now = new Date()
  const singaporeTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Singapore',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'long'
  }).format(now)

  const [dayName, currentTime] = singaporeTime.split(', ')
  const currentDay = dayName.toLowerCase() as keyof BusinessHours

  const dayHours = hours[currentDay]

  if (dayHours.closed) {
    return {
      is_open: false,
      message: 'Closed today'
    }
  }

  if (isOpen) {
    return {
      is_open: true,
      message: `Open now · Closes at ${formatTime(dayHours.close)}`,
      next_change: dayHours.close || undefined
    }
  } else {
    return {
      is_open: false,
      message: dayHours.open ? `Closed · Opens at ${formatTime(dayHours.open)}` : 'Closed',
      next_change: dayHours.open || undefined
    }
  }
}

/**
 * Format time from HH:MM to human-readable format
 */
function formatTime(time: string | null): string {
  if (!time) return ''

  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12

  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

/**
 * Get next 7 days open status
 */
export async function getWeekSchedule(businessId: string) {
  const hours = await getBusinessHours(businessId)
  if (!hours) return []

  const days: Array<{
    day: string
    date: string
    is_open: boolean
    hours_text: string
  }> = []

  const daysOfWeek: Array<keyof BusinessHours> = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ]

  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)

    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof BusinessHours
    const dayHours = hours[dayName]

    let hoursText = 'Closed'
    if (!dayHours.closed && dayHours.open && dayHours.close) {
      hoursText = `${formatTime(dayHours.open)} - ${formatTime(dayHours.close)}`
    }

    days.push({
      day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      date: date.toLocaleDateString(),
      is_open: !dayHours.closed,
      hours_text: hoursText
    })
  }

  return days
}
