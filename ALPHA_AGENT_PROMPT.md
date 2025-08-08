# HyperPairs v2 – Alpha Development Agent Prompt

You are the development agent responsible for delivering the Alpha phase of HyperPairs v2, a gamified Telegram bot for practising pair trading on Hyperliquid perpetuals (demo mode).

## Mission
Ship a rock‑solid demo that is fun on mobile, never crashes, and cleanly sets us up for real market integration. All work must follow the established modular structure and be production‑quality.

## Tech & Repo
- Node ≥ 18, Telegraf v4.16.3, dotenv, Jest
- Project root: `pair-trading-app-v2/`
- Structure (already scaffolded):
  - `bot.js` (entry)
  - `config.js` (loads `.env` with `BOT_TOKEN`)
  - `commands/` (`start`, `trade`, `portfolio`, `help`)
  - `callbacks/` (`navigation`, `executeTrade`, `customPair`)
  - `keyboards/` (`main.js`, `trade.js`)
  - `services/` (`hyperliquid.js` mock; add new services here)
  - `utils/` (`logger.js`, `errorHandler.js`)
  - `tests/` (Jest)

## Runbook
1) Create `.env` with `BOT_TOKEN` (copy `env.example`).
2) Install deps: PowerShell `npm install`; Bash `npm install`.
3) Start bot: PowerShell `npm run start`; Dev mode `npm run dev`.
4) Tests: `npm test`.

Notes for Windows PowerShell:
- Use `;` to chain commands. Do not use `&&`.

## Alpha Objectives (implement in this order)
1) Demo Portfolio + P&L (in‑memory)
   - Add `services/portfolio.js`:
     - `getUserPortfolio(userId)` → returns positions array and summary
     - `openDemoPosition(userId, { base, quote, ratioLongShort, entryPrice })`
     - `closeDemoPosition(userId, positionId, { exitPrice })`
     - Compute simple P&L using mock prices from `services/hyperliquid.js`.
   - Update `/portfolio` and navigation callbacks to render:
     - Current positions
     - Unrealized P&L
     - Buttons to close positions (demo)

2) Ratio Controls (default 50/50)
   - Extend `keyboards/trade.js` with ratio selectors:
     - Presets: 50/50, 60/40, 70/30
     - Increment/Decrement controls (±5%)
   - Add callbacks: `ratio_set_50_50`, `ratio_set_60_40`, `ratio_inc`, `ratio_dec`.
   - Persist selected ratio per user session (in memory).

3) Movers vs BTC (24h) – Mock Scanner
   - Create `services/marketMock.js` with a small universe (e.g., BTC, ETH, SOL, ARB, AVAX, OP).
   - Provide function `getRelativeMoversVsBTC({ window: '24h' })`:
     - Return list sorted by (asset % return − BTC % return).
   - Wire Trade menu button "🔍 Movers vs BTC (24h)" to show Top 5 with inline buttons to trade that asset vs BTC (pre‑filled pair selection).

4) Points Scaffold (gamification)
   - Add `services/points.js`:
     - Award points on profitable demo closes; small loss penalty; daily streak counter.
     - `getUserPoints(userId)` and `addPoints(userId, delta)`.
   - Add `/points` command to show score and streak.

5) Reliability & UX Polish
   - Ensure `bot.catch(errorHandler)` is the only global error boundary and all handlers `await ctx.answerCbQuery()`.
   - Ensure every callback edits or replies deterministically.
   - Add a clear header/banner in main menu and trade screens for casino/terminal feel.

## Acceptance Criteria
- No runtime errors under normal use
- Commands: `/start`, `/trade`, `/portfolio`, `/help`, `/points` all respond
- Users can select ratios (default 50/50) and open/close demo positions
- Portfolio shows positions with Unrealized/Realized P&L
- Movers vs BTC shows deterministic Top 5 (mock)
- Points increment on profitable closes; streak counter visible
- Jest tests pass

## Testing Requirements
- Add unit tests:
  - `services/portfolio.js`: open/close P&L math
  - `services/points.js`: increments and streak logic
  - `keyboards/trade.js`: ratio UI contains expected buttons
- Keep tests fast, deterministic, and isolated.

## Coding Standards
- Single responsibility per file
- Guard clauses, early returns, and clear variable names
- No deep nesting (> 3 levels)
- Match existing formatting style
- Add concise comments only when the “why” is non‑obvious

## Deliverables
- Updated source code with the features above
- Tests covering portfolio, points, and keyboards
- Short CHANGELOG section in this file summarizing what was delivered

## Known Pitfalls (avoid)
- Misusing Telegraf command registration objects inside callbacks
- Forgetting `await ctx.answerCbQuery()` for inline handlers
- Using Bash chaining in PowerShell
- Changing the Telegraf version: keep `^4.16.3` for now

---

### CHANGELOG (Agent fills)
- [ ] Date – Summary of changes, commands affected, tests added


