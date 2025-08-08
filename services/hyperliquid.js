// Mock Hyperliquid service for demo purposes.
// In future phases, replace with real API integration.

const mockPrices = {
  BTC_ETH: 1.24,
  SOL_ETH: 0.051
};

function getMockPrice(pairCode) {
  if (mockPrices[pairCode]) return mockPrices[pairCode];
  // simple fallback for undefined pairs
  return Number((Math.random() * 0.1 + 0.01).toFixed(4));
}

module.exports = { getMockPrice };
