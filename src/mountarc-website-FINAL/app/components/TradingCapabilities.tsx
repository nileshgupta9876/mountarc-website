'use client'

import { useState } from 'react'
import { Icons } from './Icons'

interface Capability {
  id: number
  icon: keyof typeof Icons
  title: string
  tagline: string
  features: string[]
  tech: string[]
}

const capabilities: Capability[] = [
  {
    id: 1,
    icon: 'Monitor',
    title: 'Full Trading Application Development',
    tagline: 'End-to-end trading platforms for web and mobile',
    features: [
      'Order management system (market, limit, stop-loss, bracket orders)',
      'Real-time position tracking and P&L calculations',
      'Watchlists, alerts, and customizable dashboards',
      'Multi-asset support (equities, F&O, commodities, forex, crypto)',
    ],
    tech: ['React', 'Next.js', 'Node.js', 'WebSockets', 'PostgreSQL'],
  },
  {
    id: 2,
    icon: 'Plug',
    title: 'Broker Integration',
    tagline: 'Seamless connectivity with brokers and exchanges via APIs',
    features: [
      'Multi-broker API integration (Zerodha/Kite, Angel One, Upstox, IBKR, etc.)',
      'Unified order routing across brokers',
      'Account management, fund transfer, and margin tracking',
      'OAuth-based authentication and session management',
    ],
    tech: ['REST APIs', 'WebSockets', 'OAuth 2.0', 'Node.js'],
  },
  {
    id: 3,
    icon: 'Activity',
    title: 'Live Market Data Feeds',
    tagline: 'Real-time streaming market data with low-latency delivery',
    features: [
      'WebSocket-based price streaming',
      'Candlestick, line, and depth-of-market charts',
      'Level 2 order book visualization',
      'Historical data APIs and tick-by-tick replay',
    ],
    tech: ['WebSockets', 'TradingView', 'D3.js', 'Redis'],
  },
  {
    id: 4,
    icon: 'BarChart3',
    title: 'Trading Analytics Dashboard',
    tagline: 'Data-driven insights from trading activity and market behavior',
    features: [
      'Trade journal with tagging, notes, and performance attribution',
      'Win/loss ratios, Sharpe ratio, drawdown analysis',
      'Sector-wise and strategy-wise P&L breakdown',
      'Custom report generation and export',
    ],
    tech: ['React', 'D3.js', 'Python', 'PostgreSQL', 'BigQuery'],
  },
  {
    id: 5,
    icon: 'GitBranch',
    title: 'Correlation Analysis Tools',
    tagline: 'Cross-asset and cross-timeframe correlation engines',
    features: [
      'Rolling correlation heatmaps',
      'Pair trading signal detection',
      'Sector rotation and inter-market analysis',
      'Custom correlation matrices with adjustable lookback periods',
    ],
    tech: ['Python', 'NumPy', 'Pandas', 'React', 'D3.js'],
  },
  {
    id: 6,
    icon: 'TrendingUp',
    title: 'Sentiment Meter & Analysis',
    tagline: 'Market sentiment scoring from news, social media, and market data',
    features: [
      'NLP-based news sentiment scoring',
      'Social media sentiment aggregation (Twitter/X, Reddit, StockTwits)',
      'Fear & Greed index visualization',
      'Event-driven alerts on sentiment shifts',
    ],
    tech: ['Python', 'NLP/LLMs', 'FastAPI', 'React', 'Redis'],
  },
  {
    id: 7,
    icon: 'Bot',
    title: 'Algo Trading & Strategy Builder',
    tagline: 'Tools for building, testing, and deploying automated trading strategies',
    features: [
      'Visual strategy builder',
      'Historical backtesting engine with slippage modeling',
      'Paper trading sandbox',
      'Live deployment with kill-switch and risk controls',
    ],
    tech: ['Python', 'Node.js', 'Redis', 'PostgreSQL', 'Docker'],
  },
  {
    id: 8,
    icon: 'Shield',
    title: 'Risk Management Module',
    tagline: 'Portfolio risk monitoring and exposure management',
    features: [
      'Real-time drawdown alerts and position sizing',
      'Exposure tracking across sectors, asset classes, and strategies',
      'Value-at-Risk (VaR) calculations',
      'Margin utilization monitoring and auto-square-off triggers',
    ],
    tech: ['Python', 'React', 'PostgreSQL', 'Redis'],
  },
  {
    id: 9,
    icon: 'Bell',
    title: 'TradingView Alerts & One-Click Execution',
    tagline: 'Secure alert-to-order pipeline eliminating manual trading delays',
    features: [
      'TradingView webhook-based alerts with encrypted payloads',
      'One-click buy/sell execution directly from broker accounts',
      'Multi-asset support across Stocks, Futures & Options',
      'Sub-second order placement with broker-side validation and risk checks',
    ],
    tech: ['TradingView Webhooks', 'Node.js', 'Broker APIs', 'WebSockets', 'Redis'],
  },
]

export default function TradingCapabilities() {
  const [activeId, setActiveId] = useState<number | null>(null)

  const handleCardClick = (id: number) => {
    setActiveId(activeId === id ? null : id)
  }

  const getActiveCapabilityForRow = (rowIndex: number): Capability | null => {
    if (activeId === null) return null
    const activeRowIndex = Math.floor((activeId - 1) / 3)
    if (activeRowIndex !== rowIndex) return null
    return capabilities[activeId - 1]
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Dark terminal-style container */}
      <div className="bg-gradient-to-br from-dark via-navy to-dark rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
        {/* Terminal-style grid background */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(127,204,193,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(127,204,193,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Ambient glow orbs */}
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-mint/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-[250px] h-[250px] bg-teal/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-5">
              <span className="inline-flex items-center gap-2.5 bg-mint/10 text-mint px-5 py-2.5 rounded-full text-sm font-mono font-semibold border border-mint/20 tracking-wide">
                <span className="w-2 h-2 bg-mint rounded-full animate-pulse" />
                REAL-TIME TRADING PLATFORM
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Real-Time Trading{' '}
              <span className="bg-gradient-to-r from-mint to-teal bg-clip-text text-transparent">
                Platform Solutions
              </span>
            </h2>
            <p className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              From live market data feeds to algorithmic execution engines, we architect
              and deliver real-time trading platforms built for speed, scale, and reliability.
            </p>
          </div>

          {/* ─── Desktop Grid (lg+) ─── */}
          <div className="hidden lg:block">
            {/* Row 1 */}
            <div className="grid grid-cols-3 gap-5">
              {capabilities.slice(0, 3).map((cap) => (
                <CapabilityCard
                  key={cap.id}
                  capability={cap}
                  isActive={activeId === cap.id}
                  onClick={() => handleCardClick(cap.id)}
                />
              ))}
            </div>

            {/* Expanded panel for Row 1 */}
            {getActiveCapabilityForRow(0) && (
              <ExpandedPanel capability={getActiveCapabilityForRow(0)!} />
            )}

            {/* Row 2 */}
            <div className="grid grid-cols-3 gap-5 mt-5">
              {capabilities.slice(3, 6).map((cap) => (
                <CapabilityCard
                  key={cap.id}
                  capability={cap}
                  isActive={activeId === cap.id}
                  onClick={() => handleCardClick(cap.id)}
                />
              ))}
            </div>

            {/* Expanded panel for Row 2 */}
            {getActiveCapabilityForRow(1) && (
              <ExpandedPanel capability={getActiveCapabilityForRow(1)!} />
            )}

            {/* Row 3 */}
            <div className="grid grid-cols-3 gap-5 mt-5">
              {capabilities.slice(6, 9).map((cap) => (
                <CapabilityCard
                  key={cap.id}
                  capability={cap}
                  isActive={activeId === cap.id}
                  onClick={() => handleCardClick(cap.id)}
                />
              ))}
            </div>

            {/* Expanded panel for Row 3 */}
            {getActiveCapabilityForRow(2) && (
              <ExpandedPanel capability={getActiveCapabilityForRow(2)!} />
            )}
          </div>

          {/* ─── Mobile Accordion (<lg) ─── */}
          <div className="lg:hidden space-y-3">
            {capabilities.map((cap) => (
              <div key={cap.id}>
                <MobileCard
                  capability={cap}
                  isActive={activeId === cap.id}
                  onClick={() => handleCardClick(cap.id)}
                />
                {activeId === cap.id && (
                  <MobileExpandedPanel capability={cap} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────
   Desktop Card
   ──────────────────────────────────────────── */
function CapabilityCard({
  capability,
  isActive,
  onClick,
}: {
  capability: Capability
  isActive: boolean
  onClick: () => void
}) {
  const IconComponent = Icons[capability.icon]

  return (
    <button
      onClick={onClick}
      aria-expanded={isActive}
      className={`
        group relative text-left w-full p-6 rounded-xl
        backdrop-blur-sm transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-navy
        ${
          isActive
            ? 'bg-white/10 border-2 border-mint shadow-lg shadow-mint/20 -translate-y-1'
            : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-mint/30 hover:-translate-y-1'
        }
      `}
    >
      {/* Top accent line on active */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-mint to-teal transition-transform duration-300 origin-left ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />

      {/* Icon */}
      <div
        className={`
          w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300
          ${
            isActive
              ? 'bg-mint/20 text-mint shadow-md shadow-mint/20'
              : 'bg-white/5 text-mint/70 group-hover:bg-mint/10 group-hover:text-mint'
          }
        `}
      >
        <IconComponent className="w-6 h-6" />
      </div>

      {/* Title */}
      <h3
        className={`text-[15px] font-bold leading-snug transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
        }`}
      >
        {capability.title}
      </h3>

      {/* Active indicator */}
      <div
        className={`flex items-center gap-2 text-mint text-[11px] font-mono font-semibold mt-3 tracking-wider transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="w-1.5 h-1.5 bg-mint rounded-full animate-pulse" />
        ACTIVE
      </div>
    </button>
  )
}

/* ────────────────────────────────────────────
   Desktop Expanded Panel
   ──────────────────────────────────────────── */
function ExpandedPanel({ capability }: { capability: Capability }) {
  const IconComponent = Icons[capability.icon]

  return (
    <div className="mt-5 animate-slide-down">
      <div className="bg-white/5 border border-mint/20 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-mint/10 to-transparent rounded-br-full pointer-events-none" />

        <div className="grid grid-cols-5 gap-10 relative z-10">
          {/* Left: Description + Features (3 cols) */}
          <div className="col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-mint/15 flex items-center justify-center text-mint">
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{capability.title}</h4>
                <p className="text-mint/80 text-sm font-medium">{capability.tagline}</p>
              </div>
            </div>

            <div className="space-y-2.5 mt-5">
              {capability.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-mint/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Tech Stack (2 cols) */}
          <div className="col-span-2">
            <div className="bg-white/5 rounded-lg p-6 border border-white/5">
              <span className="text-[11px] font-mono font-bold text-mint uppercase tracking-widest block mb-4">
                Technology Stack
              </span>
              <div className="flex flex-wrap gap-2.5">
                {capability.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3.5 py-2 bg-mint/10 border border-mint/20 rounded-lg text-sm font-mono font-semibold text-teal transition-colors hover:bg-mint/15 hover:border-mint/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────
   Mobile Card
   ──────────────────────────────────────────── */
function MobileCard({
  capability,
  isActive,
  onClick,
}: {
  capability: Capability
  isActive: boolean
  onClick: () => void
}) {
  const IconComponent = Icons[capability.icon]

  return (
    <button
      onClick={onClick}
      aria-expanded={isActive}
      className={`
        w-full p-5 text-left transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-navy
        ${
          isActive
            ? 'bg-white/10 border-2 border-mint border-b-0 rounded-t-xl shadow-lg shadow-mint/20'
            : 'bg-white/5 border border-white/10 rounded-xl'
        }
      `}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isActive
              ? 'bg-mint/20 text-mint shadow-md shadow-mint/20'
              : 'bg-white/5 text-mint/70'
          }`}
        >
          <IconComponent className="w-5 h-5" />
        </div>

        <h3
          className={`flex-1 text-sm font-bold leading-snug ${
            isActive ? 'text-white' : 'text-gray-300'
          }`}
        >
          {capability.title}
        </h3>

        <svg
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
            isActive ? 'rotate-180 text-mint' : 'text-gray-500'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
  )
}

/* ────────────────────────────────────────────
   Mobile Expanded Panel
   ──────────────────────────────────────────── */
function MobileExpandedPanel({ capability }: { capability: Capability }) {
  return (
    <div className="bg-white/5 border-2 border-mint border-t-0 rounded-b-xl p-5 animate-slide-down">
      <p className="text-mint/80 text-sm font-medium mb-4">{capability.tagline}</p>

      <div className="space-y-2.5 mb-5">
        {capability.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-mint/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-2.5 h-2.5 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-300 text-[13px] leading-relaxed">{feature}</p>
          </div>
        ))}
      </div>

      <span className="text-[10px] font-mono font-bold text-mint uppercase tracking-widest block mb-3">
        Tech Stack
      </span>
      <div className="flex flex-wrap gap-2">
        {capability.tech.map((tech, i) => (
          <span
            key={i}
            className="inline-block px-3 py-1.5 bg-mint/10 border border-mint/20 rounded-lg text-xs font-mono font-semibold text-teal"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
