'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icons } from '../components/Icons'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export default function BlogPage() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
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
          data: { email },
          recaptchaToken,
          pageUrl: window.location.href,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to subscribe')
      }

      setStatus('success')
      setEmail('')

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
    <>
      <section className="hero-gradient pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Insights & Resources</h1>
          <div className="section-divider bg-mint"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Valuable content on web development, AI integration, and startup technology
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-24 h-24 bg-mint/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Icons.FileText className="w-16 h-16 text-mint" />
            </div>
            <h2 className="text-3xl font-bold text-navy mb-4">Content Library Coming Soon</h2>
            <p className="text-xl text-gray-600 mb-8">
              We're preparing valuable content on web development, AI integration, SaaS best practices, and startup technology strategies.
            </p>

            <div className="bg-gray-50 p-8 rounded-xl mb-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-navy mb-4">Subscribe to Get Notified</h3>
              <p className="text-gray-600 mb-6">Be the first to know when we publish new articles and resources</p>
              {status === 'success' ? (
                <div className="bg-mint/20 border-2 border-mint text-navy p-4 rounded-lg animate-fade-in-up">
                  <p className="font-semibold flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Thank you for subscribing! Check your email for confirmation.
                  </p>
                </div>
              ) : status === 'error' ? (
                <div className="space-y-3">
                  <div className="bg-red-50 border-2 border-red-300 text-red-700 p-4 rounded-lg">
                    <p className="font-semibold flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {errorMessage || 'Oops! Please try again.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-mint hover:text-teal text-sm underline"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint text-navy disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      'Notify Me'
                    )}
                  </button>
                </form>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="btn-primary">View Our Services</Link>
              <Link href="/contact" className="btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">Topics We'll Cover</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {topics.map((topic, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-mint/30 transition-all group">
                <div className="w-14 h-14 bg-mint/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-mint/20 transition-colors">
                  {topic.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{topic.title}</h3>
                <p className="text-gray-600">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Article Preview Section (Optional) */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">Upcoming Articles</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {upcomingArticles.map((article, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{article.preview}</p>
                  <span className="text-mint text-sm font-semibold">Coming Soon</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

const topics = [
  { 
    icon: <Icons.Cpu className="w-8 h-8 text-mint" />, 
    title: 'AI Integration', 
    description: 'Practical guides on implementing AI and machine learning in modern applications' 
  },
  { 
    icon: <Icons.Cloud className="w-8 h-8 text-mint" />, 
    title: 'SaaS Development', 
    description: 'Best practices for building scalable, multi-tenant SaaS products' 
  },
  { 
    icon: <Icons.Rocket className="w-8 h-8 text-mint" />, 
    title: 'Startup Tech Strategy', 
    description: 'Technology decisions and architecture for early-stage startups' 
  },
  { 
    icon: <Icons.Lightbulb className="w-8 h-8 text-mint" />, 
    title: 'Development Best Practices', 
    description: 'Code quality, testing strategies, and software craftsmanship insights' 
  },
]

const upcomingArticles = [
  {
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    title: 'Building AI-Powered Features',
    preview: 'A practical guide to integrating AI capabilities into your web applications'
  },
  {
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
    title: 'SaaS Architecture Patterns',
    preview: 'Essential architectural decisions for building scalable SaaS products'
  },
  {
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
    title: 'MVP to Scale: A Roadmap',
    preview: 'How to evolve your MVP into a production-ready, scalable application'
  },
]
