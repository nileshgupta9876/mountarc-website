import { NextRequest, NextResponse } from 'next/server'
import { resend, EMAIL_CONFIG } from '@/lib/email/resend'
import {
  contactSchema,
  discoverySchema,
  newsletterSchema,
  unsubscribeSchema,
  ContactFormData,
  DiscoveryFormData,
  NewsletterFormData,
} from '@/lib/validation/schemas'
import {
  contactTeamNotification,
  contactUserConfirmation,
  discoveryTeamNotification,
  discoveryUserConfirmation,
  newsletterTeamNotification,
  newsletterWelcome,
} from '@/lib/email/templates'
import { checkRateLimit, getRateLimitMessage } from '@/lib/rate-limit'

type FormType = 'contact' | 'discovery' | 'newsletter' | 'unsubscribe'

interface SendEmailRequest {
  type: FormType
  data: ContactFormData | DiscoveryFormData | NewsletterFormData
  recaptchaToken: string
  pageUrl?: string
}

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.warn('RECAPTCHA_SECRET_KEY not configured, skipping verification')
    return true // Skip verification in development if not configured
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    return data.success && data.score >= 0.5
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error)
    return false
  }
}

// Get email from form data
function getEmail(data: ContactFormData | DiscoveryFormData | NewsletterFormData): string {
  return data.email
}

export async function POST(request: NextRequest) {
  try {
    const body: SendEmailRequest = await request.json()
    const { type, data, recaptchaToken, pageUrl = 'Unknown' } = body

    // Verify reCAPTCHA
    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
    if (!isValidRecaptcha) {
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // Check rate limit
    const email = getEmail(data)
    const rateLimit = checkRateLimit(email)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: getRateLimitMessage(rateLimit.retryAfter!) },
        { status: 429 }
      )
    }

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'long',
    })

    // Handle different form types
    switch (type) {
      case 'contact': {
        const validationResult = contactSchema.safeParse(data)
        if (!validationResult.success) {
          return NextResponse.json(
            { success: false, error: validationResult.error.issues[0].message },
            { status: 400 }
          )
        }

        const contactData = validationResult.data

        // Send team notification (Email A)
        const teamEmail = contactTeamNotification(contactData, timestamp, pageUrl)
        await resend.emails.send({
          from: EMAIL_CONFIG.from,
          to: EMAIL_CONFIG.recipientEmail,
          subject: teamEmail.subject,
          html: teamEmail.html,
        })

        // Send user confirmation (Email B)
        const userEmail = contactUserConfirmation(contactData)
        await resend.emails.send({
          from: EMAIL_CONFIG.from,
          replyTo: EMAIL_CONFIG.replyTo,
          to: contactData.email,
          subject: userEmail.subject,
          html: userEmail.html,
        })

        break
      }

      case 'discovery': {
        const validationResult = discoverySchema.safeParse(data)
        if (!validationResult.success) {
          return NextResponse.json(
            { success: false, error: validationResult.error.issues[0].message },
            { status: 400 }
          )
        }

        const discoveryData = validationResult.data

        // Send team notification (Email C)
        const teamEmail = discoveryTeamNotification(discoveryData, timestamp, pageUrl)
        await resend.emails.send({
          from: EMAIL_CONFIG.from,
          to: EMAIL_CONFIG.recipientEmail,
          subject: teamEmail.subject,
          html: teamEmail.html,
        })

        // Send user confirmation (Email D)
        const userEmail = discoveryUserConfirmation(discoveryData)
        await resend.emails.send({
          from: EMAIL_CONFIG.from,
          replyTo: EMAIL_CONFIG.replyTo,
          to: discoveryData.email,
          subject: userEmail.subject,
          html: userEmail.html,
        })

        break
      }

      case 'newsletter': {
        const validationResult = newsletterSchema.safeParse(data)
        if (!validationResult.success) {
          return NextResponse.json(
            { success: false, error: validationResult.error.issues[0].message },
            { status: 400 }
          )
        }

        const newsletterData = validationResult.data

        // Send team notification (Email E)
        const teamEmail = newsletterTeamNotification(newsletterData, timestamp, pageUrl)
        await resend.emails.send({
          from: EMAIL_CONFIG.from,
          to: EMAIL_CONFIG.recipientEmail,
          subject: teamEmail.subject,
          html: teamEmail.html,
        })

        // Send welcome email (Email F)
        const welcomeEmail = newsletterWelcome(newsletterData)
        await resend.emails.send({
          from: EMAIL_CONFIG.from,
          replyTo: EMAIL_CONFIG.replyTo,
          to: newsletterData.email,
          subject: welcomeEmail.subject,
          html: welcomeEmail.html,
        })

        break
      }

      case 'unsubscribe': {
        const validationResult = unsubscribeSchema.safeParse(data)
        if (!validationResult.success) {
          return NextResponse.json(
            { success: false, error: validationResult.error.issues[0].message },
            { status: 400 }
          )
        }

        // Note: In Phase 1, we don't have a database to actually remove subscribers
        // This just logs the unsubscribe request for manual processing
        console.log(`Unsubscribe request for: ${validationResult.data.email}`)

        break
      }

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid form type' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}