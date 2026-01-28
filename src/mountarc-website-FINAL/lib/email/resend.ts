import { Resend } from 'resend'

// Use a placeholder key during build if not provided
// The actual API key should be set in environment variables
const RESEND_API_KEY = process.env.RESEND_API_KEY || 'placeholder_key_for_build'

if (!process.env.RESEND_API_KEY) {
  console.warn('Missing RESEND_API_KEY environment variable - emails will not be sent')
}

export const resend = new Resend(RESEND_API_KEY)

export const EMAIL_CONFIG = {
  // Use Resend's test domain for development (no domain verification needed)
  // Change to 'MountArc <noreply@mountarc.com>' after domain verification in production
  from: 'MountArc <onboarding@resend.dev>',
  replyTo: 'contact@mountarc.com',
  recipientEmail: process.env.RECIPIENT_EMAIL || 'contact@mountarc.com',
}