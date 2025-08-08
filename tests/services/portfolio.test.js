const portfolio = require('../../services/portfolio');

describe('portfolio service', () => {
  it('open and close position computes P&L logically', () => {
    const userId = 1;
    const entryPrice = 100;
    const pos = portfolio.openDemoPosition(userId, {
      pairCode: 'BTC_ETH',
      ratioLongShort: { longPct: 50, shortPct: 50 },
      entryPrice,
    });
    // Move price up; 50/50 should be roughly neutral
    const result = portfolio.closeDemoPosition(userId, pos.id, { exitPrice: 110 });
    expect(result).toBeTruthy();
    expect(Math.abs(result.pnl)).toBeLessThan(1e-6);
  });
});


