import Link from 'next/link'
import { Icons } from '../components/Icons'

export const metadata = {
  title: 'Our Services | MountArc Private Limited',
  description: 'Comprehensive web development services including AI, dashboards, SaaS, FinTech, APIs, and MVPs.',
}

export default function ServicesPage() {
  return (
    <>
      <section className="hero-gradient pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Premium Software Services</h1>
          <div className="section-divider bg-mint"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From cloud architecture to full-stack development, we help startups scale with modern technology and best practices
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom space-y-16">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Icon Column */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-mint/10 rounded-2xl flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>
                
                {/* Content Column */}
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-navy mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tech.map((t, i) => (
                      <span key={i} className="tech-badge">{t}</span>
                    ))}
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-navy mb-3">What We Deliver:</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600">
                          <svg className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-navy mb-12 text-center">How We Work</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-mint">{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-mint">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book a free discovery call to discuss your project requirements
          </p>
          <Link href="/contact" className="btn-primary bg-white text-mint text-lg hover:bg-gray-100">
            Book Free Discovery Call
          </Link>
        </div>
      </section>
    </>
  )
}

const services = [
  { 
    icon: <Icons.Cpu className="w-12 h-12 text-mint" />, 
    title: 'AI-Enabled Web Applications', 
    description: 'Harness artificial intelligence to transform your business operations with machine learning, natural language processing, and intelligent analytics that drive real results.', 
    tech: ['Python', 'TensorFlow', 'OpenAI', 'React', 'AWS AI'],
    features: [
      'Custom ML models trained on your data',
      'NLP for text analysis and chatbots',
      'Predictive analytics and recommendations',
      'AI-powered automation workflows'
    ]
  },
  { 
    icon: <Icons.BarChart3 className="w-12 h-12 text-mint" />, 
    title: 'Real-Time Dashboards', 
    description: 'Transform complex data into actionable insights with custom-built real-time analytics platforms that update instantly and scale with your business needs.', 
    tech: ['React', 'WebSockets', 'Node.js', 'D3.js', 'Chart.js'],
    features: [
      'Real-time data visualization',
      'Custom KPI tracking',
      'Interactive charts and graphs',
      'Multi-user collaboration features'
    ]
  },
  { 
    icon: <Icons.Cloud className="w-12 h-12 text-mint" />, 
    title: 'SaaS Product Development', 
    description: 'Build scalable, cloud-based software-as-a-service products from concept to launch with architecture designed to grow with your user base.', 
    tech: ['Next.js', 'AWS', 'MongoDB', 'Stripe', 'Redis'],
    features: [
      'Multi-tenant architecture',
      'Subscription and billing integration',
      'User authentication and permissions',
      'Auto-scaling infrastructure'
    ]
  },
  { 
    icon: <Icons.Shield className="w-12 h-12 text-mint" />, 
    title: 'FinTech Solutions', 
    description: 'Develop secure, compliant financial technology applications with bank-level security, precision calculations, and adherence to industry standards.', 
    tech: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'AWS'],
    features: [
      'PCI-DSS compliant architecture',
      'Real-time transaction processing',
      'Advanced security and encryption',
      'Audit trails and compliance reporting'
    ]
  },
  { 
    icon: <Icons.Plug className="w-12 h-12 text-mint" />, 
    title: 'API Development & Integration', 
    description: 'Connect your systems seamlessly with robust API development and third-party integrations that enable data flow across your entire tech stack.', 
    tech: ['REST', 'GraphQL', 'Express', 'Django', 'FastAPI'],
    features: [
      'RESTful and GraphQL APIs',
      'Third-party service integration',
      'API documentation and testing',
      'Rate limiting and security'
    ]
  },
  { 
    icon: <Icons.Rocket className="w-12 h-12 text-mint" />, 
    title: 'MVP Development', 
    description: 'Launch your startup idea quickly with a Minimum Viable Product that validates your concept, attracts early users, and provides foundation for growth.', 
    tech: ['Next.js', 'React', 'Vercel', 'MongoDB', 'Supabase'],
    features: [
      'Rapid prototyping and development',
      'Core feature prioritization',
      'User feedback integration',
      'Scalable foundation for growth'
    ]
  },
]

const process = [
  {
    title: 'Discovery',
    description: 'We understand your business goals, challenges, and technical requirements'
  },
  {
    title: 'Planning',
    description: 'Detailed architecture design, tech stack selection, and timeline planning'
  },
  {
    title: 'Development',
    description: 'Agile development with regular updates, testing, and quality assurance'
  },
  {
    title: 'Launch',
    description: 'Deployment, monitoring, and ongoing support to ensure success'
  },
]
