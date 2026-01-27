'use client'

import Link from 'next/link'
import { Icons } from '../components/Icons'
import ContactForm from '../components/forms/ContactForm'

export default function ContactPage() {
  return (
    <>
      <section className="hero-gradient pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Get in Touch</h1>
          <div className="section-divider bg-mint"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to turn your vision into reality? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column - Contact Form */}
            <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
              <h2 className="text-3xl font-bold text-navy mb-4">Send Us a Message</h2>
              <p className="text-gray-600 mb-6">Fill out the form and we'll get back within 24 hours.</p>

              <ContactForm />
            </div>

            {/* Right Column - Illustration & Info */}
            <div className="space-y-8">
              {/* Contact Illustration Placeholder */}
              <div className="bg-gradient-to-br from-mint/10 to-teal/10 rounded-2xl p-12 flex items-center justify-center">
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Icons.MessageSquare className="w-24 h-24 text-mint" />
                </div>
              </div>

              {/* Book a Call CTA */}
              <div className="bg-gradient-to-r from-mint/10 to-teal/10 p-6 rounded-2xl border border-mint/20">
                <h3 className="text-xl font-bold text-navy mb-2">Prefer to Talk?</h3>
                <p className="text-gray-600 mb-4">Book a free 30-minute discovery call to discuss your project in detail.</p>
                <Link href="/book-call" className="btn-primary inline-block">
                  Book a Discovery Call
                </Link>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-navy mb-6">Why Work With Us?</h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icons.CheckCircle2 className="w-6 h-6 text-mint flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-navy">{benefit.title}</p>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">Other Ways to Connect</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.Linkedin className="w-8 h-8 text-mint" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">LinkedIn</h3>
              <a
                href="https://www.linkedin.com/company/mountarc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mint hover:text-teal font-semibold"
              >
                Visit Our Page →
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.Mail className="w-8 h-8 text-mint" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Email</h3>
              <a
                href="mailto:contact@mountarc.com"
                className="text-mint hover:text-teal font-semibold break-all"
              >
                contact@mountarc.com
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.MapPin className="w-8 h-8 text-mint" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Location</h3>
              <p className="text-gray-600">Based in India<br/>Serving Worldwide</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">What Happens Next?</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-mint">{index + 1}</span>
                </div>
                <h3 className="font-bold text-navy mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

const benefits = [
  {
    title: 'No Sales Pressure',
    description: 'Free discovery call to understand if we\'re a good fit'
  },
  {
    title: '24-Hour Response',
    description: 'We respond to all inquiries within one business day'
  },
  {
    title: 'Transparent Pricing',
    description: 'Clear, detailed proposals with no hidden costs'
  },
  {
    title: 'Quality Focused',
    description: 'PSPO 1 and AWS certified team with 11+ years experience'
  }
]

const steps = [
  {
    title: 'Within 24 Hours',
    description: "We'll review your inquiry and respond promptly"
  },
  {
    title: 'Discovery Call',
    description: 'Free 30-minute call to understand your needs and goals'
  },
  {
    title: 'Detailed Proposal',
    description: 'Customized proposal with timeline, scope, and pricing'
  },
  {
    title: 'Start Building',
    description: 'Align on details and kick off your project'
  },
]