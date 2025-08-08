// Simple in-memory portfolio store for demo purposes.
// Positions represent pair trades with a ratio between long and short legs.

const hyperliquid = require('./hyperliquid');
const { getPortfolioState, setPortfolioState } = require('./store');

function getUserState(userId) {
  return getPortfolioState(userId);
}

function generatePositionId(state) {
  const id = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
  return id;
}

function openDemoPosition(userId, { pairCode, longAsset, shortAsset, ratioLongShort, entryPrice }) {
  const state = getUserState(userId);
  const position = {
    id: generatePositionId(state),
    pairCode, // e.g., BTC_ETH
    longAsset, // e.g., BTC
    shortAsset, // e.g., ETH
    ratioLongShort, // { longPct, shortPct }
    entryPrice,
    openedAt: new Date().toISOString(),
  };
  const next = { ...state, positions: [...state.positions, position] };
  setPortfolioState(userId, next);
  return position;
}

function closeDemoPosition(userId, positionId, { exitPrice }) {
  const state = getUserState(userId);
  const idx = state.positions.findIndex((p) => p.id === positionId);
  if (idx === -1) return null;
  const [position] = state.positions.splice(idx, 1);
  const pnl = computePairPnl(position, exitPrice);
  const next = { positions: state.positions, realizedPnl: (state.realizedPnl || 0) + pnl };
  setPortfolioState(userId, next);
  return { position, pnl };
}

function computePairPnl(position, currentPrice) {
  // Simplified P&L: long leg benefits if price goes up, short leg benefits if price goes down
  // Treat pair price as base/quote ratio. Positive move from entry favors long; negative favors short.
  const { entryPrice, ratioLongShort } = position;
  const delta = (currentPrice - entryPrice) / entryPrice; // proportion
  const longContribution = (ratioLongShort.longPct / 100) * delta;
  const shortContribution = (ratioLongShort.shortPct / 100) * (-delta);
  // Scale up for display (notional 100 units for demo)
  const notional = 100;
  return notional * (longContribution + shortContribution);
}

function getUserPortfolio(userId) {
  const state = getUserState(userId);
  return {
    positions: state.positions.slice(),
    realizedPnl: state.realizedPnl,
  };
}

function getUnrealizedPnlSnapshot(userId) {
  const state = getUserState(userId);
  let unrealized = 0;
  for (const pos of state.positions) {
    const price = hyperliquid.getMockPrice(pos.pairCode);
    unrealized += computePairPnl(pos, price);
  }
  return unrealized;
}

module.exports = {
  getUserPortfolio,
  openDemoPosition,
  closeDemoPosition,
  getUnrealizedPnlSnapshot,
};


