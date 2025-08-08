const portfolio = require('../services/portfolio');
const hyperliquid = require('../services/hyperliquid');
const points = require('../services/points');

module.exports = (bot) => {
  bot.action(/^close_(.+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const posId = ctx.match[1];
    const userId = ctx.from.id;
    // Need position to know pairCode for exit price; in-memory store does not index by id → recalc by lookup
    const current = portfolio.getUserPortfolio(userId).positions.find(p => p.id === posId);
    if (!current) {
      await ctx.reply('Position not found.');
      return;
    }
    const exitPrice = hyperliquid.getMockPrice(current.pairCode);
    const res = portfolio.closeDemoPosition(userId, posId, { exitPrice });
    if (!res) {
      await ctx.reply('Could not close position.');
      return;
    }
    if (res.pnl > 0) {
      points.addPoints(userId, Math.round(res.pnl));
      points.recordWin(userId);
    } else {
      points.addPoints(userId, Math.round(res.pnl)); // negative reduces score
    }
    await ctx.reply(`🧾 Closed position ${posId}\nP&L: ${res.pnl.toFixed(2)}`);
  });
};


