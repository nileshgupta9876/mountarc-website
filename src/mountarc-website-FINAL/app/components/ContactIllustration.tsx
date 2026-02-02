'use client'

import { useEffect, useState } from 'react'

const techIcons = [
  { name: 'React', label: '⚛', color: '#61DAFB' },
  { name: 'Next.js', label: 'N', color: '#ffffff' },
  { name: 'Node.js', label: 'JS', color: '#68A063' },
  { name: 'TypeScript', label: 'TS', color: '#3178C6' },
  { name: 'Python', label: 'Py', color: '#FFD43B' },
  { name: 'AWS', label: 'AWS', color: '#FF9900' },
  { name: 'Azure', label: 'Az', color: '#0089D6' },
  { name: 'GCP', label: 'GC', color: '#4285F4' },
  { name: 'DigitalOcean', label: 'DO', color: '#0080FF' },
  { name: 'Docker', label: 'Dk', color: '#2496ED' },
]

export default function ContactIllustration() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-navy via-dark to-navy p-8 md:p-10">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7FCCC1 0%, transparent 70%)', transform: 'translate(-50%, -50%)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #5BB5A8 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className={`relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top label */}
        <p className="text-mint font-mono text-xs tracking-widest uppercase mb-8">Your idea, our craft</p>

        {/* Main visual: 3-step flow */}
        <div className="flex items-center justify-between gap-3 md:gap-4 mb-4">

          {/* Step 1: Lightbulb / Idea */}
          <div className={`flex flex-col items-center gap-3 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
               style={{ transitionDelay: '200ms' }}>
            <div className="relative">
              <div className="ci-glow-ring absolute inset-0 rounded-full border-2 border-mint opacity-30" />
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-mint/10 border border-mint/30 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7FCCC1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
                </svg>
              </div>
            </div>
            <span className="text-gray-400 text-xs font-medium text-center">Your Idea</span>
          </div>

          {/* Connector line 1 */}
          <div className="flex-1 flex items-center justify-center relative z-10" style={{ marginBottom: '1.5rem', marginRight: '30px' }}>
            <div className="w-full h-px bg-gradient-to-r from-mint/40 via-mint/20 to-mint/40 relative overflow-hidden">
              <div className="ci-travel-dot absolute top-1/2 left-0 w-2 h-2 rounded-full bg-mint -translate-y-1/2" />
            </div>
            <svg className="absolute right-0" width="12" height="12" viewBox="0 0 12 12" fill="#5BB5A8" opacity="0.6">
              <path d="M2 6 L10 6 L7 3 M10 6 L7 9" stroke="#5BB5A8" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Step 2: Code / We Build - with orbiting tech icons */}
          <div className={`flex flex-col items-center gap-3 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
               style={{ transitionDelay: '500ms' }}>
            <div className="relative" style={{ width: '80px', height: '80px' }}>
              {/* Orbit track rings */}
              <div className="absolute rounded-full border border-dashed border-teal/15" style={{ top: '-25px', left: '-25px', width: '130px', height: '130px' }} />
              <div className="absolute rounded-full border border-teal/8" style={{ top: '-32px', left: '-32px', width: '144px', height: '144px' }} />

              {/* Orbiting tech icons - positioned on a 130px circle */}
              <div className="ci-orbit absolute" style={{ top: '-25px', left: '-25px', width: '130px', height: '130px' }}>
                {techIcons.map((tech, i) => {
                  const angle = (i * 360) / techIcons.length
                  const rad = (angle * Math.PI) / 180
                  const r = 65
                  const cx = 65 + r * Math.sin(rad) - 10
                  const cy = 65 - r * Math.cos(rad) - 10
                  return (
                    <div
                      key={tech.name}
                      className="ci-orbit-icon ci-tech-icon absolute flex items-center justify-center w-5 h-5 rounded-full bg-dark border border-teal/30 cursor-pointer"
                      style={{ top: `${cy}px`, left: `${cx}px` }}
                      data-tooltip={tech.name}
                    >
                      <span style={{ color: tech.color, fontSize: '6px', fontWeight: 700, fontFamily: 'sans-serif', lineHeight: 1 }}>
                        {tech.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Center circle */}
              <div className="ci-glow-ring-delay absolute inset-0 rounded-full border-2 border-teal opacity-30" />
              <div className="absolute inset-0 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5BB5A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                  <line x1="14" y1="4" x2="10" y2="20" />
                </svg>
              </div>
            </div>
            <span className="relative text-gray-400 text-xs font-medium text-center" style={{ zIndex: 10, marginTop: '30px' }}>We Build</span>
          </div>

          {/* Connector line 2 */}
          <div className="flex-1 flex items-center justify-center relative z-10" style={{ marginBottom: '1.5rem', marginLeft: '30px' }}>
            <div className="w-full h-px bg-gradient-to-r from-teal/40 via-teal/20 to-mint/40 relative overflow-hidden">
              <div className="ci-travel-dot-delay absolute top-1/2 left-0 w-2 h-2 rounded-full bg-teal -translate-y-1/2" />
            </div>
            <svg className="absolute right-0" width="12" height="12" viewBox="0 0 12 12" fill="#7FCCC1" opacity="0.6">
              <path d="M2 6 L10 6 L7 3 M10 6 L7 9" stroke="#7FCCC1" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Step 3: Rocket / You Launch */}
          <div className={`flex flex-col items-center gap-3 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
               style={{ transitionDelay: '800ms' }}>
            <div className="relative">
              <div className="ci-glow-ring absolute inset-0 rounded-full border-2 border-mint opacity-30" />
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-mint/10 border border-mint/30 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7FCCC1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
            </div>
            <span className="text-gray-400 text-xs font-medium text-center">You Launch</span>
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-gray-500 text-xs mt-6 font-mono tracking-wider">
          From concept to production — we handle the code
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ciGlowPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.1; }
        }
        @keyframes ciTravelDot {
          0% { left: -4px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: calc(100% + 4px); opacity: 0; }
        }
        @keyframes ciOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ciCounterOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .ci-glow-ring {
          animation: ciGlowPulse 3s ease-in-out infinite;
        }
        .ci-glow-ring-delay {
          animation: ciGlowPulse 3s ease-in-out 1.5s infinite;
        }
        .ci-travel-dot {
          animation: ciTravelDot 2.5s ease-in-out infinite;
        }
        .ci-travel-dot-delay {
          animation: ciTravelDot 2.5s ease-in-out 1.2s infinite;
        }
        .ci-orbit {
          animation: ciOrbit 20s linear infinite;
        }
        .ci-orbit-icon {
          animation: ciCounterOrbit 20s linear infinite;
        }
        .ci-tech-icon {
          position: absolute;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .ci-tech-icon:hover {
          transform: scale(1.6) !important;
          border-color: rgba(127, 204, 193, 0.8);
          z-index: 20;
        }
        .ci-tech-icon::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          background: #1A2332;
          color: #7FCCC1;
          font-size: 10px;
          font-weight: 600;
          font-family: monospace;
          padding: 3px 8px;
          border-radius: 4px;
          border: 1px solid rgba(127, 204, 193, 0.3);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }
        .ci-tech-icon:hover::after {
          opacity: 1;
        }
      `}} />
    </div>
  )
}
