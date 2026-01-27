import Link from 'next/link'
import { Icons } from '../components/Icons'

export default function ThankYouPage() {
  return (
    <>
      <section className="hero-gradient pt-32 pb-20 min-h-[60vh] flex items-center">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-fade-in-up">
              <Icons.CheckCircle2 className="w-14 h-14 text-mint" />
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Thank You!
            </h1>
            <div className="section-divider bg-mint"></div>
            <p className="text-xl text-gray-300 mb-4 animate-fade-in-up">
              We'll Be In Touch Soon
            </p>
            <p className="text-gray-400 mb-8 animate-fade-in-up">
              Your message has been received! Our team will review it and respond within 24 hours during business days.
              We've also sent you a confirmation email.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* What Happens Next */}
            <div className="bg-gray-50 p-8 rounded-2xl mb-12">
              <h2 className="text-2xl font-bold text-navy mb-6 text-center">What Happens Next?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {nextSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-lg font-bold text-mint">{index + 1}</span>
                    </div>
                    <h3 className="font-bold text-navy mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* While You Wait */}
            <h2 className="text-2xl font-bold text-navy mb-6 text-center">While You Wait</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Link
                href="/services"
                className="bg-white border border-gray-200 p-6 rounded-xl text-center hover:border-mint hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-mint/20 transition-colors">
                  <Icons.Code className="w-7 h-7 text-mint" />
                </div>
                <h3 className="font-bold text-navy mb-2">Explore Our Services</h3>
                <p className="text-gray-600 text-sm mb-4">See how we can help bring your project to life</p>
                <span className="text-mint font-semibold group-hover:text-teal transition-colors">
                  View Services →
                </span>
              </Link>

              <Link
                href="/work"
                className="bg-white border border-gray-200 p-6 rounded-xl text-center hover:border-mint hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-mint/20 transition-colors">
                  <Icons.Briefcase className="w-7 h-7 text-mint" />
                </div>
                <h3 className="font-bold text-navy mb-2">View Our Work</h3>
                <p className="text-gray-600 text-sm mb-4">Check out our portfolio of successful projects</p>
                <span className="text-mint font-semibold group-hover:text-teal transition-colors">
                  See Projects →
                </span>
              </Link>

              <Link
                href="/blog"
                className="bg-white border border-gray-200 p-6 rounded-xl text-center hover:border-mint hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-mint/20 transition-colors">
                  <Icons.BookOpen className="w-7 h-7 text-mint" />
                </div>
                <h3 className="font-bold text-navy mb-2">Read Our Blog</h3>
                <p className="text-gray-600 text-sm mb-4">Insights on web development and AI</p>
                <span className="text-mint font-semibold group-hover:text-teal transition-colors">
                  Visit Blog →
                </span>
              </Link>
            </div>

            {/* Urgent Contact */}
            <div className="text-center bg-gradient-to-r from-mint/10 to-teal/10 p-6 rounded-2xl">
              <p className="text-navy mb-2">
                Need urgent assistance?
              </p>
              <p className="text-gray-600">
                Email us directly at{' '}
                <a href="mailto:contact@mountarc.com" className="text-mint hover:text-teal font-semibold">
                  contact@mountarc.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const nextSteps = [
  {
    title: 'Team Reviews',
    description: 'Our team will review your submission carefully'
  },
  {
    title: 'We Reach Out',
    description: "We'll contact you via email or phone"
  },
  {
    title: 'Discuss Next Steps',
    description: "We'll explore your project and requirements together"
  }
]