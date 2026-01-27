import './globals.css'
import type { Metadata } from 'next'
import { Outfit, Space_Mono } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { Providers } from './providers'
import NewsletterForm from './components/forms/NewsletterForm'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MountArc Private Limited | Premium Web Development & AI Solutions',
  description: 'Your trusted partner for quality web development. We deliver AI-enabled applications, real-time dashboards, SaaS products, and FinTech solutions for startups and small businesses worldwide.',
  keywords: 'web development, AI solutions, SaaS development, FinTech, MVP development, real-time dashboards, startup technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `
        }} />
      </head>
      <body className="font-sans">
        <Providers>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="MountArc Logo"
                width={48}
                height={48}
                className="object-contain group-hover:scale-110 transition-transform"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-navy group-hover:text-mint transition-colors">MOUNT ARC</span>
              <span className="text-xs font-mono text-mint tracking-wider">IT SOLUTIONS</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-navy hover:text-mint transition-colors font-medium">Home</Link>
            <Link href="/services" className="text-navy hover:text-mint transition-colors font-medium">Services</Link>
            <Link href="/about" className="text-navy hover:text-mint transition-colors font-medium">About</Link>
            <Link href="/work" className="text-navy hover:text-mint transition-colors font-medium">Work</Link>
            <Link href="/blog" className="text-navy hover:text-mint transition-colors font-medium">Blog</Link>
            <Link href="/book-call" className="btn-primary">Book a Call</Link>
          </div>

          <button className="md:hidden text-navy">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="container-custom">
        {/* Newsletter Section */}
        <div className="bg-white/5 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-400">
                Get bi-weekly insights on web development, AI, and building successful products. No spam, ever.
              </p>
            </div>
            <div>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="MountArc Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">MOUNT ARC</h3>
                <p className="text-sm font-mono text-mint">IT SOLUTIONS</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Building Digital Solutions That Align With Your Vision. Your trusted partner for premium web development and AI solutions.
            </p>
            <p className="text-sm text-gray-500">
              Based in India • Serving clients worldwide
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-mint transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-mint transition-colors">Services</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-mint transition-colors">About</Link></li>
              <li><Link href="/work" className="text-gray-400 hover:text-mint transition-colors">Work</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-mint transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-mint transition-colors">Contact</Link></li>
              <li><Link href="/book-call" className="text-gray-400 hover:text-mint transition-colors">Book a Call</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold mb-4 text-white">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://www.linkedin.com/company/mountarc/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-mint transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:contact@mountarc.com" className="text-gray-400 hover:text-mint transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MountArc Private Limited. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/unsubscribe" className="hover:text-mint transition-colors">
              Unsubscribe
            </Link>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-mint rounded-full animate-pulse"></span>
              Available for Projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}