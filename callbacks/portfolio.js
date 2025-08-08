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

  bot.action(/^reduce25_(.+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const posId = ctx.match[1];
    const userId = ctx.from.id;
    const current = portfolio.getUserPortfolio(userId).positions.find(p => p.id === posId);
    if (!current) return ctx.reply('Position not found.');
    const price = hyperliquid.getMockPrice(current.pairCode);
    const res = portfolio.reduceDemoPosition(userId, posId, { percent: 0.25, currentPrice: price });
    if (!res) return ctx.reply('Could not reduce.');
    await ctx.reply(`✂️ Reduced 25% of ${posId}. Realized: ${res.realizedPnl.toFixed(2)}. New size: ${res.position.sizeNotional.toFixed(0)}`);
  });

  bot.action(/^reduce50_(.+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const posId = ctx.match[1];
    const userId = ctx.from.id;
    const current = portfolio.getUserPortfolio(userId).positions.find(p => p.id === posId);
    if (!current) return ctx.reply('Position not found.');
    const price = hyperliquid.getMockPrice(current.pairCode);
    const res = portfolio.reduceDemoPosition(userId, posId, { percent: 0.50, currentPrice: price });
    if (!res) return ctx.reply('Could not reduce.');
    await ctx.reply(`✂️ Reduced 50% of ${posId}. Realized: ${res.realizedPnl.toFixed(2)}. New size: ${res.position.sizeNotional.toFixed(0)}`);
  });

  bot.action(/^flip_(.+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const posId = ctx.match[1];
    const userId = ctx.from.id;
    const current = portfolio.getUserPortfolio(userId).positions.find(p => p.id === posId);
    if (!current) return ctx.reply('Position not found.');
    const price = hyperliquid.getMockPrice(current.pairCode);
    const res = portfolio.flipDemoPosition(userId, posId, { currentPrice: price });
    if (!res) return ctx.reply('Could not flip.');
    await ctx.reply(`🔁 Flipped position. Closed P&L: ${res.closedPnl.toFixed(2)}. New: Long ${res.newPosition.longAsset} / Short ${res.newPosition.shortAsset}`);
  });
};


