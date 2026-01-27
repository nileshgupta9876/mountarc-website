'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import Link from 'next/link'
import { unsubscribeSchema, UnsubscribeFormData } from '@/lib/validation/schemas'
import { Icons } from '../components/Icons'

export default function UnsubscribePage() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UnsubscribeFormData>({
    resolver: zodResolver(unsubscribeSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: UnsubscribeFormData) => {
    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage(null)

    try {
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not loaded')
      }

      const recaptchaToken = await executeRecaptcha('unsubscribe_form')

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'unsubscribe',
          data,
          recaptchaToken,
          pageUrl: window.location.href,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to unsubscribe')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="hero-gradient pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Unsubscribe from Newsletter</h1>
          <div className="section-divider bg-mint"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're sorry to see you go!
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            {status === 'success' ? (
              <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icons.CheckCircle2 className="w-8 h-8 text-mint" />
                </div>
                <h2 className="text-2xl font-bold text-navy mb-4">You've Been Unsubscribed</h2>
                <p className="text-gray-600 mb-6">
                  You won't receive any more newsletters from us.
                </p>
                <p className="text-gray-500 text-sm mb-8">
                  Changed your mind? You can re-subscribe anytime on our website.
                </p>
                <Link href="/" className="btn-primary inline-block">
                  Return to Home
                </Link>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold text-navy mb-4 text-center">Confirm Unsubscribe</h2>
                <p className="text-gray-600 mb-6 text-center">
                  Enter your email below to unsubscribe from our newsletter.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {errorMessage || 'Something went wrong. Please try again.'}
                    </div>
                  )}

                  <div>
                    <label className="block text-navy font-semibold mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mint text-navy ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-8 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
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
                        Processing...
                      </>
                    ) : (
                      'Unsubscribe'
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-gray-500 text-sm mb-4">
                    Note: We manually manage our subscriber list. Your request will be processed within 24-48 hours.
                  </p>
                  <Link href="/" className="text-mint hover:text-teal font-semibold text-sm">
                    ← Back to Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}