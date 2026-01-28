import Link from 'next/link'
import Image from 'next/image'
import { Icons } from '../components/Icons'

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

          <div className="space-y-16 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                {/* Project Visual */}
                <div className="flex-1">
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    {/* Mock browser/app chrome */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800/70 backdrop-blur-sm flex items-center px-4 gap-2">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-mint/10 text-mint text-sm font-semibold rounded-full">
                      {project.category}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-navy mb-4">{project.title}</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                  {/* Challenge & Solution */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-sm font-bold text-navy mb-2 uppercase tracking-wide">Challenge</h4>
                      <p className="text-gray-600">{project.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy mb-2 uppercase tracking-wide">Solution</h4>
                      <p className="text-gray-600">{project.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy mb-2 uppercase tracking-wide">Result</h4>
                      <p className="text-mint font-semibold">{project.result}</p>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-badge text-xs">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

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
          <Link href="/contact" className="btn-primary bg-white text-mint text-lg hover:bg-gray-100">
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  )
}

const projects = [
  {
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop',
    category: 'FinTech',
    title: 'Real-Time Trading Platform',
    description: 'A high-performance trading platform enabling users to execute trades with sub-second latency',
    challenge: 'Handle 10,000+ concurrent users with real-time price updates and ensure zero data loss during high-volume trading periods',
    solution: 'Implemented microservices architecture with WebSocket connections, Redis caching, and PostgreSQL for transaction integrity',
    result: 'Platform processes 50,000+ trades daily with <50ms latency and 99.99% uptime',
    tech: ['Node.js', 'React', 'WebSockets', 'PostgreSQL', 'Redis', 'AWS']
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    category: 'Analytics Dashboard',
    title: 'Business Intelligence Platform',
    description: 'Custom analytics dashboard providing real-time insights across multiple data sources',
    challenge: 'Aggregate data from 15+ different APIs and databases, visualize complex metrics, and provide real-time updates',
    solution: 'Built ETL pipelines, implemented data warehouse with BigQuery, and created responsive dashboard with D3.js visualizations',
    result: 'Reduced reporting time from 4 hours to 15 seconds, enabling data-driven decisions',
    tech: ['React', 'Node.js', 'D3.js', 'BigQuery', 'Python', 'Apache Airflow']
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    category: 'SaaS Product',
    title: 'Multi-Tenant SaaS Platform',
    description: 'Subscription-based business management platform serving 500+ organizations',
    challenge: 'Build scalable multi-tenant architecture supporting customizable workflows per organization',
    solution: 'Designed database schema with tenant isolation, implemented role-based access control, integrated Stripe for billing',
    result: 'Platform scales seamlessly, processing 1M+ transactions monthly across tenants',
    tech: ['Next.js', 'MongoDB', 'Stripe', 'AWS', 'Redis', 'Docker']
  },
  {
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    category: 'AI/ML Application',
    title: 'AI-Powered Recommendation Engine',
    description: 'Machine learning system providing personalized product recommendations',
    challenge: 'Process user behavior data in real-time and deliver accurate recommendations with minimal latency',
    solution: 'Implemented collaborative filtering with TensorFlow, deployed ML models with AWS SageMaker, real-time inference API',
    result: '35% increase in conversion rate and 50% improvement in user engagement',
    tech: ['Python', 'TensorFlow', 'AWS SageMaker', 'FastAPI', 'PostgreSQL']
  },
  {
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
    category: 'Mobile-First',
    title: 'Cross-Platform Mobile App',
    description: 'Progressive web app with offline-first capabilities for field service teams',
    challenge: 'Enable offline data collection, background sync, and work across iOS, Android, and desktop',
    solution: 'Built PWA with service workers, IndexedDB for offline storage, and background sync API for seamless data updates',
    result: 'Field teams increased productivity by 40% with offline capabilities',
    tech: ['React', 'PWA', 'Service Workers', 'IndexedDB', 'Node.js']
  },
  {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop',
    category: 'E-Commerce',
    title: 'Headless E-Commerce Platform',
    description: 'Modern e-commerce solution with decoupled frontend and backend architecture',
    challenge: 'Support multiple storefronts (web, mobile, POS) from single backend with real-time inventory sync',
    solution: 'Built headless commerce API with GraphQL, integrated payment gateways, implemented real-time inventory management',
    result: 'Handles 10K+ daily orders with 99.9% uptime and seamless omnichannel experience',
    tech: ['Next.js', 'GraphQL', 'Stripe', 'Shopify', 'PostgreSQL', 'Vercel']
  },
  {
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop',
    category: 'MVP',
    title: 'Startup MVP to Series A',
    description: 'Minimum viable product that helped startup validate concept and secure $2M Series A',
    challenge: 'Build and launch functional product in 8 weeks to test market fit before fundraising',
    solution: 'Prioritized core features, rapid prototyping, iterative development based on user feedback',
    result: 'Launched in 8 weeks, achieved 1,000 users in first month, secured Series A funding',
    tech: ['Next.js', 'Supabase', 'Vercel', 'Stripe', 'React']
  },
  {
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop',
    category: 'Enterprise',
    title: 'Enterprise Resource Planning (ERP) System',
    description: 'Custom ERP solution for manufacturing company with 500+ employees',
    challenge: 'Replace legacy system, integrate with existing tools, migrate 10 years of historical data',
    solution: 'Built modular ERP with microservices, created data migration pipelines, integrated with Salesforce and QuickBooks',
    result: 'Reduced operational costs by 30%, improved process efficiency by 45%',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS']
  }
]

const stats = [
  { number: '50+', label: 'Projects Delivered' },
  { number: '99.9%', label: 'Uptime Average' },
  { number: '5', label: 'Countries Served' },
  { number: '100%', label: 'Client Satisfaction' },
]
