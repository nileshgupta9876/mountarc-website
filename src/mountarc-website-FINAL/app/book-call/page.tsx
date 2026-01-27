'use client'

import { Icons } from '../components/Icons'
import DiscoveryCallForm from '../components/forms/DiscoveryCallForm'

export default function BookCallPage() {
  return (
    <>
      <section className="hero-gradient pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Book Your Free Discovery Call</h1>
          <div className="section-divider bg-mint"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Let's discuss your project - no pressure, no commitment. Just a conversation to see how we can help.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column - Form */}
            <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
              <h2 className="text-3xl font-bold text-navy mb-4">Request a Call</h2>
              <p className="text-gray-600 mb-6">Fill out the form and we'll confirm your preferred time within 24 hours.</p>

              <DiscoveryCallForm />
            </div>

            {/* Right Column - Info */}
            <div className="space-y-8">
              {/* What to Expect */}
              <div className="bg-gradient-to-br from-mint/10 to-teal/10 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-navy mb-6">What to Expect</h3>
                <ul className="space-y-4">
                  {expectations.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icons.CheckCircle2 className="w-6 h-6 text-mint flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-navy">{item.title}</p>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reassurance */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-mint/10 rounded-full flex items-center justify-center">
                    <Icons.Calendar className="w-6 h-6 text-mint" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy">We'll Confirm Within 24 Hours</h4>
                    <p className="text-gray-600 text-sm">Your preferred time is noted, we'll reach out to finalize.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-mint/10 rounded-full flex items-center justify-center">
                    <Icons.CheckCircle2 className="w-6 h-6 text-mint" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy">100% Free Consultation</h4>
                    <p className="text-gray-600 text-sm">No strings attached, just helpful guidance.</p>
                  </div>
                </div>
              </div>

              {/* Contact Alternative */}
              <div className="text-center text-gray-600">
                <p>Prefer email? Reach us at</p>
                <a href="mailto:contact@mountarc.com" className="text-mint hover:text-teal font-semibold">
                  contact@mountarc.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">How It Works</h2>
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

const expectations = [
  {
    title: '30-45 Minute Consultation',
    description: 'Enough time to understand your project and provide value'
  },
  {
    title: 'Discuss Your Goals & Challenges',
    description: "We'll explore what you're building and the problems you're solving"
  },
  {
    title: 'Get Honest Feedback',
    description: "You'll receive genuine recommendations based on our experience"
  },
  {
    title: 'No Sales Pressure',
    description: "This is a conversation, not a sales pitch"
  }
]

const steps = [
  {
    title: 'Submit Request',
    description: 'Fill out the form with your preferred time'
  },
  {
    title: 'We Confirm',
    description: "We'll reach out within 24 hours to confirm"
  },
  {
    title: 'Discovery Call',
    description: 'Have a productive conversation about your project'
  },
  {
    title: 'Next Steps',
    description: 'Receive a follow-up with our recommendations'
  }
]