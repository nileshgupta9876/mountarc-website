import { z } from 'zod'
import { isValidPhoneNumber, CountryCode } from 'libphonenumber-js'

// Validate phone number using libphonenumber-js with country context
function validatePhone(phone: string, countryCode: CountryCode): boolean {
  if (!phone || phone.trim() === '') return true // optional field
  // Strip spaces and dashes for validation, prepend dial code is handled by the form
  return isValidPhoneNumber(phone, countryCode)
}

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional().or(z.literal('')),
  phoneCountry: z.string().optional(),
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
  phone: z.string().optional().or(z.literal('')),
  phoneCountry: z.string().optional(),
  preferredTime: z.string().optional().or(z.literal('')),
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

// Phone validation helper for use in form components
export { validatePhone }

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
