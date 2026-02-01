# Trading Platform Capabilities Section — Work Page Enhancement
**Date**: 2026-02-01
**Role**: Product Manager
**Status**: Accepted

## Decision
Add a new "Trading Platform Expertise" section to the Work page showcasing 8 trading-related capabilities MountArc can deliver, using an interactive card grid with inline expansion.

## Context
MountArc is a new organization and the current Work page presents generic past project case studies. To credibly position MountArc's strength in trading/FinTech solutions without fabricating project history, we are adding a capabilities-focused section that highlights what we can build.

## Options Considered
1. **Reframe entire Work page as capabilities** — Too disruptive; loses the existing project showcase format
2. **Update only the trading project entry** — Too limited; one card can't convey depth
3. **Add new dedicated section (chosen)** — Best of both worlds; keeps existing projects and adds trading expertise depth

## Chosen Approach
**Selected**: Option 3 — Add a new section between existing projects and stats

**Rationale**: Preserves existing page structure while adding a distinct, visually appealing trading expertise showcase. Positions MountArc as a specialist without making unverifiable claims about past work.

## Section Specification

### Placement
Between the project showcase grid and the "Our Track Record" stats section.

### 8 Capabilities to Showcase

1. **Full Trading Application Development** — End-to-end trading platforms (order management, position tracking, P&L, watchlists, multi-asset support)
2. **Broker Integration** — Multi-broker API connectivity (Zerodha/Kite, Angel One, Upstox, IBKR), order routing, account management, OAuth
3. **Live Market Data Feeds** — Real-time WebSocket streaming, candlestick/depth-of-market charts, Level 2 order book, historical data APIs
4. **Trading Analytics Dashboard** — Trade journal, win/loss ratios, Sharpe ratio, drawdown analysis, sector/strategy P&L breakdown, custom reports
5. **Correlation Analysis Tools** — Rolling correlation heatmaps, pair trading signals, sector rotation analysis, custom correlation matrices
6. **Sentiment Meter & Analysis** — NLP-based news sentiment, social media aggregation, Fear & Greed index, event-driven alerts
7. **Algo Trading & Strategy Builder** — Visual strategy builder, backtesting engine, paper trading sandbox, live deployment with kill-switch
8. **Risk Management Module** — Drawdown alerts, position sizing, exposure tracking, VaR calculations, margin monitoring, auto-square-off

### Interaction Design
- **Desktop**: 4x2 card grid. Click expands card inline below its row, revealing full details. One card open at a time.
- **Mobile**: Single column accordion (tap to expand/collapse).
- **Visual**: Icons per capability, mint accent for active state, tech stack badges, smooth animations.
- **Pattern reference**: Stripe/Vercel/Linear capability showcases.

### Tech Stack per Capability
Each card displays relevant technologies as badges (React, Next.js, Node.js, WebSockets, Python, D3.js, PostgreSQL, Redis, etc.)

## Trade-offs
- Adds complexity to Work page (new interactive client component)
- Section is capabilities-focused, not evidence-based — may need real case studies added later as projects are delivered
- 8 items is dense; interaction pattern keeps it manageable

## Next Steps
- [ ] Engineering implements the interactive component
- [ ] Add proper icons for each capability (Lucide/Heroicons)
- [ ] Ensure responsive design (grid to accordion)
- [ ] Review content for accuracy before deployment
