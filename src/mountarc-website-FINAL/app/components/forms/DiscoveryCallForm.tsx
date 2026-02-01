'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useRouter } from 'next/navigation'
import { CountryCode } from 'libphonenumber-js'
import { discoverySchema, DiscoveryFormData, BUDGET_RANGES, validatePhone } from '@/lib/validation/schemas'
import PhoneInput, { COUNTRIES } from './PhoneInput'
import DateTimePicker from './DateTimePicker'

export default function DiscoveryCallForm() {
  const router = useRouter()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>('IN')
  const [phoneValue, setPhoneValue] = useState('')
  const [phoneError, setPhoneError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DiscoveryFormData>({
    resolver: zodResolver(discoverySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      phoneCountry: 'IN',
      preferredTime: '',
      description: '',
      budget: '',
    },
  })

  const descriptionValue = watch('description', '')
  const descriptionLength = descriptionValue?.length || 0

  const handlePhoneChange = (phone: string) => {
    setPhoneValue(phone)
    setValue('phone', phone)
    if (phoneError) setPhoneError(null)
  }

  const handleCountryChange = (country: CountryCode) => {
    setPhoneCountry(country)
    setValue('phoneCountry', country)
    if (phoneError) setPhoneError(null)
  }

  const onSubmit = async (data: DiscoveryFormData) => {
    // Validate phone if provided
    if (phoneValue && phoneValue.trim() !== '') {
      const country = COUNTRIES.find((c) => c.code === phoneCountry)
      const fullNumber = `${country?.dialCode || '+91'}${phoneValue.replace(/[\s-]/g, '')}`
      if (!validatePhone(fullNumber, phoneCountry)) {
        setPhoneError(`Please enter a valid phone number for ${country?.name || 'the selected country'}`)
        return
      }
      // Store full number with dial code
      data.phone = fullNumber
    }

    setIsSubmitting(true)
    setError(null)

    try {
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not loaded')
      }

      const recaptchaToken = await executeRecaptcha('discovery_form')

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'discovery',
          data,
          recaptchaToken,
          pageUrl: window.location.href,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to book discovery call')
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
        <label className="block text-navy font-semibold mb-2">
          Phone Number
        </label>
        <PhoneInput
          value={phoneValue}
          countryCode={phoneCountry}
          onPhoneChange={handlePhoneChange}
          onCountryChange={handleCountryChange}
          error={phoneError || undefined}
        />
        <p className="mt-1 text-sm text-gray-500">
          Optional — helps us schedule the call faster
        </p>
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">
          Preferred Date & Time
        </label>
        <DateTimePicker
          value={watch('preferredTime') || ''}
          onChange={(val) => setValue('preferredTime', val, { shouldValidate: true })}
          error={errors.preferredTime?.message}
        />
        <p className="mt-1 text-sm text-gray-500">
          Select your preferred slot — we&apos;ll confirm availability
        </p>
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">
          Budget Range <span className="text-red-500">*</span>
        </label>
        <select
          {...register('budget')}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mint text-navy ${
            errors.budget ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Select budget range...</option>
          {BUDGET_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
        {errors.budget && (
          <p className="mt-1 text-sm text-red-500">{errors.budget.message}</p>
        )}
      </div>

      <div>
        <label className="block text-navy font-semibold mb-2">
          Brief Project Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('description')}
          rows={5}
          placeholder="Tell us about your project and what you'd like to discuss..."
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mint text-navy resize-none ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        <div className="flex justify-between mt-1">
          {errors.description ? (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          ) : (
            <span />
          )}
          <span
            className={`text-sm ${
              descriptionLength > 250 ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {descriptionLength}/250
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
            Booking...
          </>
        ) : (
          'Request Discovery Call'
        )}
      </button>
    </form>
  )
}
