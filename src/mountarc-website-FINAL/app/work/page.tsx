import Link from 'next/link'
import { Icons } from '../components/Icons'
import TradingCapabilities from '../components/TradingCapabilities'

export const metadata = {
  title: 'Our Work | MountArc Private Limited',
  description: 'Explore our portfolio of web applications, dashboards, SaaS products, and fintech solutions.',
}

export default function WorkPage() {
  return (
    <>
      <section className="hero-gradient pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Our Work</h1>
          <div className="section-divider bg-mint"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transforming ideas into powerful digital solutions across industries
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <p className="text-gray-600 max-w-3xl mx-auto">
              While client confidentiality prevents us from sharing specific details, here are examples of the types of projects we've delivered. Each showcases our expertise in building scalable, reliable solutions.
            </p>
          </div>

          {/* Real-Time Trading Platform — Interactive Showcase */}
          <TradingCapabilities />

          {/* NDA Disclaimer */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-gray-50 border-l-4 border-mint p-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Icons.Lock className="w-6 h-6 text-mint flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-navy mb-2">Client Confidentiality</h4>
                  <p className="text-gray-600 text-sm">
                    Due to non-disclosure agreements, specific client names and proprietary details have been generalized. We're happy to discuss relevant experience and provide references during our discovery call.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">Our Track Record</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="stat-number text-4xl mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-mint">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Let's Build Your Next Project</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ready to discuss your project? Book a free discovery call to explore how we can help.
          </p>
          <Link href="/contact" className="inline-block bg-white text-mint font-semibold py-3 px-8 rounded-xl text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:bg-gray-100">
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  )
}

const stats = [
  { number: '50+', label: 'Projects Delivered' },
  { number: '99.9%', label: 'Uptime Average' },
  { number: '5', label: 'Countries Served' },
  { number: '100%', label: 'Client Satisfaction' },
]
