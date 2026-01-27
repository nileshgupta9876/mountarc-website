'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useRouter } from 'next/navigation'
import { contactSchema, ContactFormData, PROJECT_TYPES, BUDGET_RANGES } from '@/lib/validation/schemas'
import { Icons } from '../Icons'

export default function ContactForm() {
  const router = useRouter()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: '',
      budget: '',
      message: '',
    },
  })

  const messageValue = watch('message', '')
  const messageLength = messageValue?.length || 0

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not loaded')
      }

      const recaptchaToken = await executeRecaptcha('contact_form')

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          data,
          recaptchaToken,
          pageUrl: window.location.href,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send message')
      }

      router.push('/thank-you')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-navy font-semibold mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('name')}
          placeholder="John Doe"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mint text-navy ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          {...register('email')}
          placeholder="john@company.com"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mint text-navy ${
            errors.email ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">Phone Number</label>
        <input
          type="tel"
          {...register('phone')}
          placeholder="+1 (555) 123-4567"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mint text-navy ${
            errors.phone ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">Project Type</label>
        <select
          {...register('projectType')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint text-navy"
        >
          <option value="">Select project type...</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">Budget Range</label>
        <select
          {...register('budget')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint text-navy"
        >
          <option value="">Select budget range...</option>
          {BUDGET_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Tell us about your project..."
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mint text-navy resize-none ${
            errors.message ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        <div className="flex justify-between mt-1">
          {errors.message ? (
            <p className="text-sm text-red-500">{errors.message.message}</p>
          ) : (
            <span />
          )}
          <span
            className={`text-sm ${
              messageLength > 250 ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {messageLength}/250
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}