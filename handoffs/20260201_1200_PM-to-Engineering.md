# Handoff: PM to Engineering
**Date**: 2026-02-01
**From**: Product Manager
**To**: Engineering

## Work Completed
- Defined 8 trading platform capabilities to showcase on Work page
- Approved content for all 8 capability cards (titles, descriptions, features, tech stacks)
- Selected interaction pattern: interactive card grid with inline expansion
- Decision documented in `decisions/pm/20260201_trading-capabilities-section.md`

## What Engineering Needs to Do

### 1. Create Trading Capabilities Section
**File to modify**: `src/mountarc-website-FINAL/app/work/page.tsx`

**Placement**: New section between the existing project showcase (line ~107) and the stats section (line ~109).

**Section header**: "Trading Platform Expertise" with subtitle about full-stack trading solutions.

### 2. Build Interactive Component
Since the Work page is currently a server component, you'll need a client component for interactivity.

**Create**: A new client component (e.g., `TradingCapabilities.tsx`) in the components directory.

**Behavior**:
- **Desktop**: 4x2 grid of cards. Clicking a card expands it inline below its row, showing full details. Only one card expanded at a time.
- **Mobile**: Single column, accordion-style (tap to expand/collapse).
- Smooth expand/collapse animations.
- Mint accent color for active/selected card.

### 3. Content for Each Card

#### Card 1: Full Trading Application Development
- **Icon**: Monitor/terminal icon
- **Tagline**: End-to-end trading platforms for web and mobile
- **Features**:
  - Order management system (market, limit, stop-loss, bracket orders)
  - Real-time position tracking and P&L calculations
  - Watchlists, alerts, and customizable dashboards
  - Multi-asset support (equities, F&O, commodities, forex, crypto)
- **Tech**: React, Next.js, Node.js, WebSockets, PostgreSQL

#### Card 2: Broker Integration
- **Icon**: Link/plug icon
- **Tagline**: Seamless connectivity with brokers and exchanges via APIs
- **Features**:
  - Multi-broker API integration (Zerodha/Kite, Angel One, Upstox, IBKR, etc.)
  - Unified order routing across brokers
  - Account management, fund transfer, and margin tracking
  - OAuth-based authentication and session management
- **Tech**: REST APIs, WebSockets, OAuth 2.0, Node.js

#### Card 3: Live Market Data Feeds
- **Icon**: Activity/signal icon
- **Tagline**: Real-time streaming market data with low-latency delivery
- **Features**:
  - WebSocket-based price streaming
  - Candlestick, line, and depth-of-market charts
  - Level 2 order book visualization
  - Historical data APIs and tick-by-tick replay
- **Tech**: WebSockets, TradingView Charting Library, D3.js, Redis

#### Card 4: Trading Analytics Dashboard
- **Icon**: BarChart/PieChart icon
- **Tagline**: Data-driven insights from trading activity and market behavior
- **Features**:
  - Trade journal with tagging, notes, and performance attribution
  - Win/loss ratios, Sharpe ratio, drawdown analysis
  - Sector-wise and strategy-wise P&L breakdown
  - Custom report generation and export
- **Tech**: React, D3.js, Python, PostgreSQL, BigQuery

#### Card 5: Correlation Analysis Tools
- **Icon**: GitBranch/Network icon
- **Tagline**: Cross-asset and cross-timeframe correlation engines
- **Features**:
  - Rolling correlation heatmaps
  - Pair trading signal detection
  - Sector rotation and inter-market analysis
  - Custom correlation matrices with adjustable lookback periods
- **Tech**: Python, NumPy, Pandas, React, D3.js

#### Card 6: Sentiment Meter & Analysis
- **Icon**: Gauge/TrendingUp icon
- **Tagline**: Market sentiment scoring from news, social media, and market data
- **Features**:
  - NLP-based news sentiment scoring
  - Social media sentiment aggregation (Twitter/X, Reddit, StockTwits)
  - Fear & Greed index visualization
  - Event-driven alerts on sentiment shifts
- **Tech**: Python, NLP/LLMs, FastAPI, React, Redis

#### Card 7: Algo Trading & Strategy Builder
- **Icon**: Bot/Cpu icon
- **Tagline**: Tools for building, testing, and deploying automated trading strategies
- **Features**:
  - Visual strategy builder (no-code/low-code)
  - Historical backtesting engine with slippage modeling
  - Paper trading sandbox
  - Live deployment with kill-switch and risk controls
- **Tech**: Python, Node.js, Redis, PostgreSQL, Docker

#### Card 8: Risk Management Module
- **Icon**: Shield/AlertTriangle icon
- **Tagline**: Portfolio risk monitoring and exposure management
- **Features**:
  - Real-time drawdown alerts and position sizing
  - Exposure tracking across sectors, asset classes, and strategies
  - Value-at-Risk (VaR) calculations
  - Margin utilization monitoring and auto-square-off triggers
- **Tech**: Python, React, PostgreSQL, Redis

### 4. Styling Requirements
- Use existing design system (Tailwind CSS, navy/mint color scheme)
- Cards should have hover elevation effect
- Active card highlighted with mint accent
- Tech badges same style as existing project tech badges (`.tech-badge`)
- Responsive: grid on desktop, stack on mobile
- Smooth CSS transitions for expand/collapse

### 5. No External Dependencies
- Use only existing packages (React, Next.js, Tailwind)
- Icons from existing Icons component or Lucide React (already likely available)
- No new npm packages needed

## Open Questions
- [ ] Should we add a subtle background pattern or illustration to differentiate this section visually?
- [ ] Exact icons to use — Engineering can pick appropriate Lucide icons

## Relevant Files
- `src/mountarc-website-FINAL/app/work/page.tsx` — Main file to modify
- `src/mountarc-website-FINAL/app/components/Icons.tsx` — Existing icons component
- `decisions/pm/20260201_trading-capabilities-section.md` — Full decision record
