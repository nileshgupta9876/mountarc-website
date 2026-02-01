'use client'

import { useState, useRef, useEffect } from 'react'
import { CountryCode } from 'libphonenumber-js'

export interface CountryOption {
  code: CountryCode
  name: string
  dialCode: string
  flag: string
  maxDigits: number
  placeholder: string
}

export const COUNTRIES: CountryOption[] = [
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', maxDigits: 10, placeholder: '98765 43210' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', maxDigits: 10, placeholder: '555 123 4567' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', maxDigits: 11, placeholder: '7911 123456' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', maxDigits: 10, placeholder: '555 123 4567' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', maxDigits: 9, placeholder: '412 345 678' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿', maxDigits: 10, placeholder: '21 123 4567' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', maxDigits: 9, placeholder: '512 345 678' },
  { code: 'AE', name: 'UAE', dialCode: '+971', flag: '🇦🇪', maxDigits: 9, placeholder: '501 234 567' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', maxDigits: 8, placeholder: '9123 4567' },
]

interface PhoneInputProps {
  value: string
  countryCode: CountryCode
  onPhoneChange: (phone: string) => void
  onCountryChange: (country: CountryCode) => void
  error?: string
}

export default function PhoneInput({
  value,
  countryCode,
  onPhoneChange,
  onCountryChange,
  error,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedCountry = COUNTRIES.find((c) => c.code === countryCode) || COUNTRIES[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div>
      <div className="flex">
        {/* Country code dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-1.5 px-3 py-3 border rounded-l-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-mint text-navy text-sm whitespace-nowrap ${
              error ? 'border-red-300' : 'border-gray-300'
            } border-r-0`}
          >
            <span className="text-base">{selectedCountry.flag}</span>
            <span className="font-medium">{selectedCountry.dialCode}</span>
            <svg
              className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onCountryChange(country.code)
                    onPhoneChange('')
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-mint/10 text-left ${
                    country.code === countryCode ? 'bg-mint/10 font-medium' : ''
                  }`}
                >
                  <span className="text-base">{country.flag}</span>
                  <span className="text-navy">{country.name}</span>
                  <span className="text-gray-500 ml-auto">{country.dialCode}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone number input */}
        <input
          type="tel"
          value={value}
          onChange={(e) => {
            const digits = e.target.value.replace(/[^\d\s-]/g, '')
            const digitCount = digits.replace(/[\s-]/g, '').length
            if (digitCount <= selectedCountry.maxDigits) {
              onPhoneChange(digits)
            }
          }}
          placeholder={selectedCountry.placeholder}
          className={`flex-1 px-4 py-3 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-mint text-navy ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
