import Link from 'next/link'
import { Icons } from './components/Icons'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center pt-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237FCCC1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>

        <div className="container-custom py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-block">
                <span className="badge">
                  <span className="w-2 h-2 bg-mint rounded-full animate-pulse"></span>
                  Available for New Projects
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Building Digital Solutions That
                <span className="text-mint"> Align With Your Vision</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Your trusted partner for quality web development. We deliver reliable applications using modern technology, AI enablement, and comprehensive testing.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/contact" className="btn-primary text-lg">
                  Book Free Discovery Call
                </Link>
                <Link href="/services" className="btn-secondary text-lg bg-transparent">
                  Explore Services
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 pt-8 border-t border-gray-700">
                <div className="flex items-center gap-2">
                  <Icons.Award className="w-5 h-5 text-mint" />
                  <span className="text-gray-300 font-medium">PSPO 1 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Award className="w-5 h-5 text-mint" />
                  <span className="text-gray-300 font-medium">AWS 2X Developer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.Sparkles className="w-5 h-5 text-mint" />
                  <span className="text-gray-300 font-medium">11+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* Hero Illustration Placeholder */}
            <div className="relative animate-fade-in-up">
              <div className="relative">
                <div className="aspect-square max-w-[500px] mx-auto relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Center icon */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-mint/10 rounded-2xl flex items-center justify-center animate-float">
                        <Icons.Cpu className="w-20 h-20 text-mint" />
                      </div>
                      
                      {/* Floating elements */}
                      <div className="absolute top-[10%] left-[15%] w-20 h-20 bg-mint/5 rounded-xl flex items-center justify-center animate-float-delayed-1">
                        <Icons.Cloud className="w-12 h-12 text-mint/60" />
                      </div>
                      <div className="absolute top-[15%] right-[10%] w-24 h-24 bg-mint/5 rounded-xl flex items-center justify-center animate-float-delayed-2">
                        <Icons.BarChart3 className="w-14 h-14 text-mint/60" />
                      </div>
                      <div className="absolute bottom-[20%] left-[10%] w-20 h-20 bg-mint/5 rounded-xl flex items-center justify-center animate-float-delayed-3">
                        <Icons.Rocket className="w-12 h-12 text-mint/60" />
                      </div>
                      <div className="absolute bottom-[15%] right-[15%] w-20 h-20 bg-mint/5 rounded-xl flex items-center justify-center animate-float-delayed-1">
                        <Icons.Shield className="w-12 h-12 text-mint/60" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8 lg:absolute lg:bottom-0 lg:left-0 lg:right-0">
                  <div className="glass-card p-6 rounded-xl">
                    <div className="stat-number text-3xl">7+</div>
                    <p className="text-gray-300 font-medium mt-1 text-sm">Years Delivering</p>
                  </div>
                  <div className="glass-card p-6 rounded-xl">
                    <div className="stat-number text-3xl">5</div>
                    <p className="text-gray-300 font-medium mt-1 text-sm">Countries Served</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
            <svg className="w-6 h-6 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <p className="text-center text-gray-500 font-medium mb-8">Trusted by startups and businesses worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <span className="text-2xl font-bold text-gray-400">USA</span>
            <span className="text-gray-400">•</span>
            <span className="text-2xl font-bold text-gray-400">UK</span>
            <span className="text-gray-400">•</span>
            <span className="text-2xl font-bold text-gray-400">Australia</span>
            <span className="text-gray-400">•</span>
            <span className="text-2xl font-bold text-gray-400">UAE</span>
            <span className="text-gray-400">•</span>
            <span className="text-2xl font-bold text-gray-400">Ireland</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-navy mb-4">What We Build</h2>
            <div className="section-divider"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered applications to scalable SaaS platforms, we help startups and small businesses build technology that drives growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="service-card group">
                <div className="w-16 h-16 bg-mint/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-mint/20 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-navy mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tech.map((tech, i) => (
                    <span key={i} className="tech-badge text-sm">{tech}</span>
                  ))}
                </div>
                
                <Link href="/services" className="text-mint font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                  Learn More
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-gradient-to-br from-navy to-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237FCCC1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Why Choose MountArc?</h2>
            <div className="section-divider bg-mint"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're not just another development agency. We're your long-term technology partner committed to your success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChoose.map((item, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-mint/20 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-mint">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Turn Your Vision Into Reality?
          </h2>
          <p className="text-2xl text-white/90 mb-10 leading-relaxed">
            Book a free discovery call. We'll discuss your challenges and explore whether we're a good fit—no sales pressure.
          </p>
          <Link href="/contact" className="bg-white text-mint font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 text-lg inline-flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Book Free Discovery Call
          </Link>
          <p className="text-white/80 mt-6 text-sm">No commitment required • Response within 24 hours</p>
        </div>
      </section>
    </>
  )
}

const services = [
  {
    icon: <Icons.Cpu className="w-10 h-10 text-mint" />,
    title: 'AI-Enabled Web Applications',
    description: 'Harness artificial intelligence to transform your business operations with intelligent automation and actionable insights.',
    tech: ['Python', 'TensorFlow', 'React', 'AWS AI'],
  },
  {
    icon: <Icons.BarChart3 className="w-10 h-10 text-mint" />,
    title: 'Real-Time Dashboards',
    description: 'Transform data into actionable insights with custom-built real-time analytics and visualization platforms.',
    tech: ['React', 'WebSockets', 'Node.js', 'D3.js'],
  },
  {
    icon: <Icons.Cloud className="w-10 h-10 text-mint" />,
    title: 'SaaS Product Development',
    description: 'Build scalable, cloud-based software solutions from concept to launch with architecture that grows with you.',
    tech: ['Next.js', 'AWS', 'MongoDB', 'Stripe'],
  },
  {
    icon: <Icons.Shield className="w-10 h-10 text-mint" />,
    title: 'FinTech Solutions',
    description: 'Develop secure, compliant financial technology applications with precision, reliability, and industry standards.',
    tech: ['Node.js', 'Python', 'PostgreSQL', 'Redis'],
  },
  {
    icon: <Icons.Plug className="w-10 h-10 text-mint" />,
    title: 'API Development',
    description: 'Connect systems seamlessly with robust API development and third-party integrations that scale.',
    tech: ['REST', 'GraphQL', 'Express', 'Django'],
  },
  {
    icon: <Icons.Rocket className="w-10 h-10 text-mint" />,
    title: 'MVP Development',
    description: 'Launch your startup idea quickly with a Minimum Viable Product that validates concepts and attracts users.',
    tech: ['React', 'Next.js', 'Vercel', 'MongoDB'],
  },
]

const whyChoose = [
  {
    icon: <Icons.Award className="w-10 h-10 text-mint" />,
    title: 'Proven Expertise',
    description: 'Real experience with trading platforms, AI/ML solutions, SaaS products, and enterprise systems',
  },
  {
    icon: <Icons.Zap className="w-10 h-10 text-mint" />,
    title: 'Modern Tech Stack',
    description: 'React, Node.js, Python, AI/ML, Cloud—we use the technologies that matter for your business',
  },
  {
    icon: <Icons.Sparkles className="w-10 h-10 text-mint" />,
    title: 'Quality Focused',
    description: 'PSPO 1 and AWS certified team with 11+ years combined experience in delivery excellence',
  },
  {
    icon: <Icons.Globe className="w-10 h-10 text-mint" />,
    title: 'Global Reach',
    description: 'Serving startups and businesses across USA, UK, Australia, UAE, and Ireland',
  },
  {
    icon: <Icons.Target className="w-10 h-10 text-mint" />,
    title: 'Best Practices',
    description: 'Micro-level requirement gathering, comprehensive testing, and iterative development',
  },
  {
    icon: <Icons.Handshake className="w-10 h-10 text-mint" />,
    title: 'Long-Term Partnership',
    description: 'We\'re building relationships, not just delivering projects. Your success is our success',
  },
]
