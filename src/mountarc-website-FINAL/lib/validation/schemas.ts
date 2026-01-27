import { z } from 'zod'

// Phone validation regex - supports international formats with country code
const phoneRegex = /^\+\d{1,3}\s?\d{6,14}$/

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z
    .string()
    .regex(phoneRegex, 'Include country code (e.g., +1 555-123-4567)')
    .optional()
    .or(z.literal('')),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(250, 'Message must be under 250 characters'),
})

export const discoverySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().regex(phoneRegex, 'Include country code (e.g., +1 555-123-4567)'),
  preferredTime: z.string().min(10, 'Please provide your preferred date/time'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(250, 'Description must be under 250 characters'),
  budget: z.string().min(1, 'Please select a budget range'),
})

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email'),
})

export const unsubscribeSchema = z.object({
  email: z.string().email('Please enter a valid email'),
})

// Types
export type ContactFormData = z.infer<typeof contactSchema>
export type DiscoveryFormData = z.infer<typeof discoverySchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>
export type UnsubscribeFormData = z.infer<typeof unsubscribeSchema>

// Constants
export const PROJECT_TYPES = [
  'AI-Enabled Web Application',
  'Real-Time Dashboard',
  'SaaS Product Development',
  'FinTech Solution',
  'API Development',
  'MVP Development',
  'Trading',
  'Other',
]

export const BUDGET_RANGES = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  'Not sure yet',
]