// Mock market service for relative performance vs BTC

const universe = [
  { symbol: 'BTC', ret24h: 0.00, ret1w: 0.02, sector: 'L1' },
  { symbol: 'ETH', ret24h: 0.015, ret1w: 0.03, sector: 'L1' },
  { symbol: 'SOL', ret24h: 0.042, ret1w: 0.10, sector: 'L1' },
  { symbol: 'ARB', ret24h: -0.012, ret1w: 0.01, sector: 'L2' },
  { symbol: 'AVAX', ret24h: 0.028, ret1w: 0.05, sector: 'L1' },
  { symbol: 'OP', ret24h: -0.021, ret1w: -0.03, sector: 'L2' },
];

function getRelativeMoversVsBTC({ window = '24h', limit = 5, sector } = {}) {
  const btc = universe.find((a) => a.symbol === 'BTC');
  const rel = universe
    .filter((a) => a.symbol !== 'BTC')
    .filter((a) => !sector || a.sector === sector)
    .map((a) => {
      const base = window === '1w' ? a.ret1w : a.ret24h;
      const cmp = window === '1w' ? btc.ret1w : btc.ret24h;
      return { symbol: a.symbol, relative: base - cmp };
    })
    .sort((a, b) => b.relative - a.relative)
    .slice(0, limit);
  return rel;
}

module.exports = { getRelativeMoversVsBTC, universe };


