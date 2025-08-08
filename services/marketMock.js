// Mock market service for relative performance vs BTC

const universe = [
  { symbol: 'BTC', ret24h: 0.00 },
  { symbol: 'ETH', ret24h: 0.015 },
  { symbol: 'SOL', ret24h: 0.042 },
  { symbol: 'ARB', ret24h: -0.012 },
  { symbol: 'AVAX', ret24h: 0.028 },
  { symbol: 'OP', ret24h: -0.021 },
];

function getRelativeMoversVsBTC({ window = '24h', limit = 5 } = {}) {
  const btc = universe.find((a) => a.symbol === 'BTC');
  const rel = universe
    .filter((a) => a.symbol !== 'BTC')
    .map((a) => ({ symbol: a.symbol, relative: a.ret24h - btc.ret24h }))
    .sort((a, b) => b.relative - a.relative)
    .slice(0, limit);
  return rel;
}

module.exports = { getRelativeMoversVsBTC };


