import Link from 'next/link'
import { Icons } from '../components/Icons'

export const metadata = {
  title: 'About Us | MountArc Private Limited',
  description: 'Learn about MountArc\'s mission, founders, and why we\'re the trusted technology partner for startups worldwide.',
}

export default function AboutPage() {
  return (
    <>
      <section className="hero-gradient pt-32 pb-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">About MountArc</h1>
          <div className="section-divider bg-mint"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Building Technology Partnerships That Last</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold text-navy mb-6 text-center">Our Story</h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p>MountArc was founded with a clear vision: to build a software development organization that clients can truly rely on. We're not just another agency looking for quick projects—we're building long-term partnerships with startups and small businesses who need a trustworthy technology partner.</p>
            <p>Our mission is simple: turn your vision into reality. We believe that great software starts with understanding your business, your challenges, and your goals. That's why we never rush to onboard clients.</p>
            <p>At MountArc, we combine modern technology, AI enablement, and rigorous development practices to deliver reliable, scalable solutions.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-navy mb-12 text-center">Meet Our Founders</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* CEO Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              {/* Founder Illustration Placeholder */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-mint/20 to-teal/20 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
                      <Icons.Briefcase className="w-16 h-16 text-mint" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-10 h-10 bg-mint rounded-full flex items-center justify-center border-4 border-white">
                    <Icons.Award className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-navy mb-2 text-center">Co-Founder & CEO</h3>
              <div className="w-16 h-1 bg-mint mb-6 mx-auto"></div>
              
              <p className="text-gray-600 mb-6">With 7 years of experience in Manual Testing and Project Management, our CEO brings deep expertise in quality assurance and product delivery. PSPO 1 certified, he has led projects across trading platforms and web applications.</p>
              
              <div className="bg-mint/10 p-4 rounded-lg border border-mint/20">
                <p className="text-sm font-semibold text-navy mb-2 flex items-center gap-2">
                  <Icons.Target className="w-4 h-4 text-mint" />
                  What drives him:
                </p>
                <p className="text-gray-600 italic">"Delivering product development from scratch and helping clients bring their vision to life."</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="tech-badge text-xs">PSPO 1 Certified</span>
                <span className="tech-badge text-xs">7+ Years QA/PM</span>
                <span className="tech-badge text-xs">Product Delivery</span>
              </div>
            </div>

            {/* CTO Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              {/* Founder Illustration Placeholder */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-mint/20 to-teal/20 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
                      <Icons.Code className="w-16 h-16 text-mint" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-10 h-10 bg-mint rounded-full flex items-center justify-center border-4 border-white">
                    <Icons.Award className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-navy mb-2 text-center">Co-Founder & CTO</h3>
              <div className="w-16 h-1 bg-mint mb-6 mx-auto"></div>
              
              <p className="text-gray-600 mb-6">Our CTO brings 4 years of specialized expertise in React, Node.js, Python, Cloud infrastructure, and AI/ML. AWS 2X Developer Certified, he has architected solutions for trading platforms and ERP systems.</p>
              
              <div className="bg-mint/10 p-4 rounded-lg border border-mint/20">
                <p className="text-sm font-semibold text-navy mb-2 flex items-center gap-2">
                  <Icons.Target className="w-4 h-4 text-mint" />
                  What drives him:
                </p>
                <p className="text-gray-600 italic">"Building scalable, clean code and solving complex technical challenges with modern architecture."</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="tech-badge text-xs">AWS 2X Certified</span>
                <span className="tech-badge text-xs">Full-Stack Dev</span>
                <span className="tech-badge text-xs">AI/ML Expert</span>
              </div>
            </div>
          </div>

          {/* Team Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="stat-number text-4xl mb-2">11+</div>
              <p className="text-gray-600">Years Combined Experience</p>
            </div>
            <div className="text-center">
              <div className="stat-number text-4xl mb-2">50+</div>
              <p className="text-gray-600">Projects Delivered</p>
            </div>
            <div className="text-center">
              <div className="stat-number text-4xl mb-2">5</div>
              <p className="text-gray-600">Countries Served</p>
            </div>
            <div className="text-center">
              <div className="stat-number text-4xl mb-2">100%</div>
              <p className="text-gray-600">Quality Focused</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-navy mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto bg-mint/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-mint/20 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-navy mb-12 text-center">Certifications & Expertise</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-20 h-20 mx-auto bg-mint/10 rounded-full flex items-center justify-center mb-4">
                <Icons.Award className="w-12 h-12 text-mint" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">PSPO 1 Certified</h3>
              <p className="text-gray-600">Professional Scrum Product Owner certification from Scrum.org</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-20 h-20 mx-auto bg-mint/10 rounded-full flex items-center justify-center mb-4">
                <Icons.Award className="w-12 h-12 text-mint" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">AWS 2X Developer</h3>
              <p className="text-gray-600">AWS Certified Developer with expertise in cloud architecture</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-mint">
        <div className="container-custom text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your vision to life
          </p>
          <Link href="/contact" className="btn-primary bg-white text-mint text-lg hover:bg-gray-100">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}

const values = [
  { 
    icon: <Icons.Zap className="w-10 h-10 text-mint" />, 
    title: 'Quality Over Speed', 
    description: 'We never compromise on code quality or testing.' 
  },
  { 
    icon: <Icons.Target className="w-10 h-10 text-mint" />, 
    title: 'Client Vision First', 
    description: 'Your goals drive our technical decisions.' 
  },
  { 
    icon: <Icons.Handshake className="w-10 h-10 text-mint" />, 
    title: 'Long-Term Partnerships', 
    description: 'We\'re building relationships, not just projects.' 
  },
  { 
    icon: <Icons.Rocket className="w-10 h-10 text-mint" />, 
    title: 'Modern Technology', 
    description: 'We stay current with latest technologies and AI.' 
  },
  { 
    icon: <Icons.MessageSquare className="w-10 h-10 text-mint" />, 
    title: 'Transparent Communication', 
    description: 'You\'ll always know where your project stands.' 
  },
  { 
    icon: <Icons.CheckCircle2 className="w-10 h-10 text-mint" />, 
    title: 'Rigorous Testing', 
    description: 'We deliver solutions you can rely on.' 
  },
]
