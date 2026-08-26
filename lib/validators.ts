import { z } from 'zod'

export const registerSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  gender: z.string().min(1, 'Gender is required'),
  date_of_birth: z.string().min(4, 'Date of birth is required'),
})

export const profileSchema = z.object({
  bio: z.string().optional(),
  madhhab: z.string().optional(),
  prayer_frequency: z.number().int().min(0).max(5).optional(),
  quran_recitation_level: z.string().optional(),
  hijab_or_beard: z.string().optional(),
  halal_lifestyle: z.string().optional(),
  marriage_timeline: z.string().optional(),
  children_preference: z.string().optional(),
  relocation_willingness: z.string().optional(),
  education: z.string().optional(),
  occupation: z.string().optional(),
  location: z.string().optional(),
  privacy_level: z.enum(['PUBLIC', 'MATCHED_ONLY', 'WALI_ONLY', 'PRIVATE']).optional(),
  visible_to_wali: z.boolean().optional(),
  photo_visibility: z.string().optional(),
})

export const messageSchema = z.object({
  content: z.string().min(1).max(1000),
  message_type: z.enum(['QUESTION', 'ANSWER', 'NOTE', 'SYSTEM']).optional(),
})

export const eventSchema = z.object({
  title: z.string().min(2),
  event_type: z.enum(['FAMILY_MEETING', 'SCHOLAR_SESSION', 'CHECK_IN']),
  scheduled_at: z.string().min(4),
  location: z.string().optional(),
  mode: z.string().min(2),
})
