# HyperPairs v2 – Product Plan to Live

This plan outlines how we go from the current Alpha demo to a live, user‑facing product with a strong casino‑meets‑terminal UX, growth loops, and a sustainable path to real trading.

## Phase 0 – Current (Done)
- Clean, modular Telegraf bot
- Core commands and navigation
- Mock service and basic tests

## Phase 1 – Alpha Demo (1–2 weeks)
Goals: Validate UX, stability, and the core trading loop without real funds.

- Demo Portfolio & P&L (in‑memory)
- Ratio Control UI (50/50 default; presets and ± controls)
- Movers vs BTC (24h) – Mock top movers list
- Points & Streak scaffold; `/points` command
- Tests: portfolio math, points, keyboards
- Non‑functional: zero runtime errors; graceful error handling

Exit criteria: Users can open/close demo positions with customizable ratios, see P&L and points, and discover opportunities via Movers vs BTC.

## Phase 2 – Beta Foundations (2–3 weeks)
Goals: Persistence, leaderboards, and pre‑integration data quality.

- Persistence Layer
  - Local DB (SQLite or low‑maintenance KV store) for users, positions, points
  - Migrations and backup/restore scripts
- Leaderboards
  - Weekly and all‑time; anti‑cheating guardrails (cap on daily points, cooldowns)
- Market Data Service
  - External source for price candles (free/low‑cost API) to replace mock for scanner
  - Normalize symbols to future Hyperliquid markets
- Admin Tools
  - `/admin stats`, `/admin broadcast`
  - Feature flags for enabling/disabling experimental features

Exit criteria: State is durable across restarts; leaderboards operational; scanner uses real price feed; admin control in place.

## Phase 3 – Hyperliquid Integration (3–4 weeks)
Goals: Move from demo to real testnet trading with strong safety rails.

- Hyperliquid Service
  - Abstracted module with clear interface: `getMarkets`, `getFunding`, `placeOrder`, `closePosition`, `getPositions`
  - Testnet first, mock fallback for outages
- Risk & UX
  - Validate ratios and sizes; min/max notional; leverage defaults
  - Confirmations with clear risk summaries
  - Funding‑rate insights in trade confirm view
- Compliance & Disclosures
  - Clear demo vs real mode banners
  - Terms/Disclosures command

Exit criteria: Users can place and close testnet positions via bot; meaningful funding data is surfaced; UX remains stable.

## Phase 4 – Wallet Generation (2–3 weeks)
Goals: Seamless onboarding via custodial wallet v0, with export/import options.

- Custodial Wallet v0
  - Secure key generation and encryption (per user)
  - Export & import flow with warnings
  - Basic funds view and simple receive address
- Security
  - Secrets handling, encryption at rest, least‑privilege design
  - Incident runbook and rotation procedures

Exit criteria: Users can generate a wallet in‑bot, receive funds, and export safely; security practices documented and reviewed.

## Phase 5 – Growth & Monetization (ongoing)
Goals: Acquire users, keep them engaged, and introduce sustainable fees.

- Gamification
  - Seasonal points, badges, time‑boxed challenges
  - Streak rewards and limited‑time “house games”
- Social & Viral
  - Shareable trade cards
  - Referral links with points multipliers
- Monetization
  - Small per‑trade fee (transparent), optional premium tier (advanced scanners, alerts)
  - Sponsorships or prize pools for competitions

Exit criteria: Consistent user growth, healthy engagement metrics, and clear monetization pathways.

## Milestones & Checkpoints
- Weekly demo to review UX and stability
- Test coverage threshold: 70%+ for services
- Error budget: < 0.1% sessions with errors

## Risks & Mitigations
- Market API instability → graceful degradation to cached/mocked data
- Custodial wallet security → staged rollout, audits, export‑first mindset
- Bot UX complexity → keep one‑screen flows; progressive disclosure

## Operating Procedures
- Versioned releases; CHANGELOG updates
- Feature flags for risky changes
- Monitoring hooks (logs, basic uptime checks)

## Launch Plan (to Live)
1) Stable Alpha → close UX gaps, no runtime errors
2) Beta with persistence + leaderboards + real market scanner
3) Testnet Hyperliquid trading with safety rails
4) Limited wallet generation pilot with invited users
5) Open beta + growth programs + initial monetization


