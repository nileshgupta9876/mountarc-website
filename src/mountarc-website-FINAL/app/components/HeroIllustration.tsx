'use client'

import { useEffect, useState } from 'react'

// Outer ring - Infrastructure/Backend
const outerRingIcons = [
  { name: 'PostgreSQL', label: 'PG', color: '#336791' },
  { name: 'MongoDB', label: 'M', color: '#47A248' },
  { name: 'GitHub', label: 'GH', color: '#FFFFFF' },
  { name: 'AWS', label: 'AWS', color: '#FF9900' },
  { name: 'GCP', label: 'GCP', color: '#4285F4' },
  { name: 'Azure', label: 'Az', color: '#0089D6' },
  { name: 'Terraform', label: 'TF', color: '#7B42BC' },
  { name: 'SQL', label: 'SQL', color: '#CC2927' },
]

// Inner ring - Application Layer
const innerRingIcons = [
  { name: 'Lambda', label: 'λ', color: '#FF9900' },
  { name: 'Kubernetes', label: 'K8s', color: '#326CE5' },
  { name: 'Docker', label: '🐋', color: '#2496ED' },
  { name: 'Python', label: 'Py', color: '#FFD43B' },
  { name: 'React', label: '⚛', color: '#61DAFB' },
  { name: 'Node.js', label: 'JS', color: '#68A063' },
  { name: 'Stripe', label: '$', color: '#635BFF' },
  { name: 'MQTT', label: 'MQ', color: '#660066' },
]

export default function HeroIllustration() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-navy via-dark to-navy p-6 md:p-8">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7FCCC1 0%, transparent 70%)', transform: 'translate(-50%, -50%)' }}
      />

      {/* Content */}
      <div className={`relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>

        {/* Main visual: dual orbiting rings */}
        <div className="flex items-center justify-center mb-6" style={{ minHeight: '450px', position: 'relative' }}>

          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%)', zIndex: 30 }}>
            <div className="relative" style={{ width: '80px', height: '80px' }}>

              {/* Outer ring orbit track */}
              <div className="absolute rounded-full border border-dashed border-mint/15" style={{ top: '-130px', left: '-130px', width: '340px', height: '340px' }} />
              <div className="absolute rounded-full border border-mint/8" style={{ top: '-137px', left: '-137px', width: '354px', height: '354px' }} />

              {/* Inner ring orbit track */}
              <div className="absolute rounded-full border border-dashed border-teal/20" style={{ top: '-75px', left: '-75px', width: '230px', height: '230px' }} />
              <div className="absolute rounded-full border border-teal/10" style={{ top: '-82px', left: '-82px', width: '244px', height: '244px' }} />

              {/* Shooting star arrows from inner ring to center */}
              <svg className="absolute" style={{ top: '-137px', left: '-137px', width: '354px', height: '354px', pointerEvents: 'none', zIndex: 15, overflow: 'visible' }}>
                <defs>
                  {/* Gradient for shooting star trail */}
                  <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7FCCC1" stopOpacity="0" />
                    <stop offset="50%" stopColor="#7FCCC1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#7FCCC1" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {innerRingIcons.map((tech, i) => {
                  const innerAngle = (i * 360) / innerRingIcons.length
                  const innerRad = (innerAngle * Math.PI) / 180
                  const innerR = 115
                  const innerX = 177 + innerR * Math.sin(innerRad)
                  const innerY = 177 - innerR * Math.cos(innerRad)

                  const pathId = `shooting-star-path-${i}`
                  const delay = i * 2 // 2 seconds between each icon

                  return (
                    <g key={`shooting-star-${i}`}>
                      <defs>
                        <path id={pathId} d={`M ${innerX} ${innerY} L 177 177`} />
                      </defs>

                      {/* Shooting star with trail effect */}
                      <g className="shooting-star-group">
                        {/* Trail */}
                        <circle r="1.5" fill="url(#star-gradient)" opacity="0.4">
                          <animateMotion dur="1.2s" repeatCount="indefinite" begin={`${delay}s`}>
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                        </circle>

                        {/* Main star */}
                        <circle r="3" fill={tech.color} opacity="0" className="shooting-star-main">
                          <animateMotion dur="1.2s" repeatCount="indefinite" begin={`${delay}s`}>
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                          <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" repeatCount="indefinite" begin={`${delay}s`} />
                          <animate attributeName="r" values="3;4;3;2" dur="1.2s" repeatCount="indefinite" begin={`${delay}s`} />
                        </circle>

                        {/* Glow effect */}
                        <circle r="6" fill={tech.color} opacity="0" className="shooting-star-glow">
                          <animateMotion dur="1.2s" repeatCount="indefinite" begin={`${delay}s`}>
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                          <animate attributeName="opacity" values="0;0.3;0.3;0" dur="1.2s" repeatCount="indefinite" begin={`${delay}s`} />
                        </circle>
                      </g>
                    </g>
                  )
                })}
              </svg>

              {/* Outer ring - Infrastructure icons */}
              <div className="hero-orbit-outer absolute" style={{ top: '-130px', left: '-130px', width: '340px', height: '340px' }}>
                {outerRingIcons.map((tech, i) => {
                  const angle = (i * 360) / outerRingIcons.length
                  const rad = (angle * Math.PI) / 180
                  const r = 170
                  const iconSize = 48
                  const cx = 170 + r * Math.sin(rad) - iconSize / 2
                  const cy = 170 - r * Math.cos(rad) - iconSize / 2
                  return (
                    <div
                      key={tech.name}
                      className="hero-orbit-icon-outer hero-tech-icon absolute flex items-center justify-center w-12 h-12 rounded-full bg-dark border border-mint/30 cursor-pointer"
                      style={{ top: `${cy}px`, left: `${cx}px`, zIndex: 10 }}
                      data-tooltip={tech.name}
                    >
                      <span style={{ color: tech.color, fontSize: '10px', fontWeight: 700, fontFamily: 'sans-serif', lineHeight: 1 }}>
                        {tech.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Inner ring - Application Layer icons */}
              <div className="hero-orbit-inner absolute" style={{ top: '-75px', left: '-75px', width: '230px', height: '230px' }}>
                {innerRingIcons.map((tech, i) => {
                  const angle = (i * 360) / innerRingIcons.length
                  const rad = (angle * Math.PI) / 180
                  const r = 115
                  const iconSize = 40
                  const cx = 115 + r * Math.sin(rad) - iconSize / 2
                  const cy = 115 - r * Math.cos(rad) - iconSize / 2
                  return (
                    <div
                      key={tech.name}
                      className="hero-orbit-icon-inner hero-tech-icon absolute flex items-center justify-center w-10 h-10 rounded-full bg-dark border border-teal/30 cursor-pointer icon-shooting"
                      style={{ top: `${cy}px`, left: `${cx}px`, zIndex: 20 }}
                      data-tooltip={tech.name}
                    >
                      <span style={{ color: tech.color, fontSize: tech.label.length > 2 ? '10px' : '18px', fontWeight: 700, fontFamily: 'sans-serif', lineHeight: 1 }}>
                        {tech.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Center circle - Trophy with impact glow */}
              <div className="hero-glow-ring absolute inset-0 rounded-full border-2 border-mint opacity-30" style={{ zIndex: 25 }} />
              <div className="hero-impact-glow absolute inset-0 rounded-full" style={{ zIndex: 24, background: 'radial-gradient(circle, rgba(127, 204, 193, 0.4) 0%, transparent 70%)' }} />
              <div className="absolute inset-0 rounded-full bg-mint/10 border border-mint/30 flex items-center justify-center" style={{ zIndex: 25 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7FCCC1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
            </div>
            <span className="relative block text-center text-mint text-xs font-mono font-bold tracking-wider" style={{ zIndex: 30, marginTop: '8px', marginLeft: '-10px' }}>CLIENT VISION</span>
          </div>
        </div>

        {/* Stats grid - reduced size */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: '11+', label: 'Years Experience' },
            { value: '5', label: 'Countries Served' },
            { value: '50+', label: 'Projects Delivered' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((s) => (
            <div key={s.label} style={{ padding: 12, borderRadius: 10, textAlign: 'center' as const, background: 'rgba(127,204,193,0.05)', border: '1px solid rgba(127,204,193,0.15)' }}>
              <div style={{ fontSize: 20, fontWeight: 700, background: 'linear-gradient(135deg,#7FCCC1,#5BB5A8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
              <p style={{ color: '#9CA3AF', fontWeight: 500, marginTop: 2, fontSize: 11 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroGlowPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.1; }
        }
        @keyframes heroImpactGlow {
          0% { transform: scale(1); opacity: 0; }
          5% { transform: scale(1.3); opacity: 0.6; }
          10% { transform: scale(1); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes heroOrbitOuter {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes heroOrbitInner {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes heroCounterOrbitOuter {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes heroCounterOrbitInner {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hero-glow-ring {
          animation: heroGlowPulse 3s ease-in-out infinite;
        }
        .hero-impact-glow {
          animation: heroImpactGlow 1.5s ease-out infinite;
        }
        .hero-orbit-outer {
          animation: heroOrbitOuter 40s linear infinite;
        }
        .hero-orbit-inner {
          animation: heroOrbitInner 30s linear infinite;
        }
        .hero-orbit-icon-outer {
          animation: heroCounterOrbitOuter 40s linear infinite;
        }
        .hero-orbit-icon-inner {
          animation: heroCounterOrbitInner 30s linear infinite;
        }
        .shooting-star-main {
          filter: drop-shadow(0 0 4px currentColor);
        }
        .shooting-star-glow {
          filter: blur(3px);
        }
        @keyframes iconShootPulse {
          0%, 87.5%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0px rgba(127, 204, 193, 0);
          }
          93.75% {
            transform: scale(1.2);
            box-shadow: 0 0 20px rgba(127, 204, 193, 0.9);
          }
        }
        .hero-tech-icon {
          position: absolute;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .icon-shooting {
          animation: iconShootPulse 16s ease-in-out infinite;
        }
        .icon-shooting:nth-child(1) { animation-delay: 0s; }
        .icon-shooting:nth-child(2) { animation-delay: 2s; }
        .icon-shooting:nth-child(3) { animation-delay: 4s; }
        .icon-shooting:nth-child(4) { animation-delay: 6s; }
        .icon-shooting:nth-child(5) { animation-delay: 8s; }
        .icon-shooting:nth-child(6) { animation-delay: 10s; }
        .icon-shooting:nth-child(7) { animation-delay: 12s; }
        .icon-shooting:nth-child(8) { animation-delay: 14s; }
        .hero-tech-icon:hover {
          transform: scale(1.2) !important;
          border-color: rgba(127, 204, 193, 0.8);
          box-shadow: 0 0 12px rgba(127, 204, 193, 0.6);
          z-index: 50 !important;
        }
        .hero-orbit-icon-outer.hero-tech-icon:hover {
          transform: scale(1.2) !important;
        }
        .hero-orbit-icon-inner.hero-tech-icon:hover {
          transform: scale(1.2) !important;
        }
        .hero-tech-icon::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: #1A2332;
          color: #7FCCC1;
          font-size: 10px;
          font-weight: 600;
          font-family: monospace;
          padding: 4px 8px;
          border-radius: 6px;
          border: 1px solid rgba(127, 204, 193, 0.4);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        .hero-tech-icon:hover::after {
          opacity: 1;
          transform: translateX(-50%) translateY(-2px);
        }
      `}} />
    </div>
  )
}
