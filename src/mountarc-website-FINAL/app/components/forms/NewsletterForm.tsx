'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { newsletterSchema, NewsletterFormData } from '@/lib/validation/schemas'

export default function NewsletterForm() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage(null)

    try {
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not loaded')
      }

      const recaptchaToken = await executeRecaptcha('newsletter_form')

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          data,
          recaptchaToken,
          pageUrl: window.location.href,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to subscribe')
      }

      setStatus('success')
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      {status === 'success' ? (
        <div className="flex items-center gap-2 text-mint animate-fade-in-up">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Thanks! Check your email for confirmation.</span>
        </div>
      ) : status === 'error' ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-red-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>{errorMessage || 'Oops! Please try again.'}</span>
          </div>
          <button
            onClick={() => setStatus('idle')}
            className="text-mint hover:text-teal text-sm underline"
          >
            Try again
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="email"
              {...register('email')}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mint text-white placeholder-gray-400 ${
                errors.email ? 'border-red-400' : 'border-gray-600'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Subscribing...</span>
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
      )}
    </div>
  )
}