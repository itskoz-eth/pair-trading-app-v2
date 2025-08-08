const hyperliquid = require('../services/hyperliquid');
const portfolio = require('../services/portfolio');

module.exports = (bot) => {
  // Matches actions like trade_BTC_ETH
  bot.action(/^trade_(.+)$/, async (ctx) => {
    const pairCode = ctx.match[1];
    const price = hyperliquid.getMockPrice(pairCode);
    await ctx.answerCbQuery();
    const ratio = ctx.session?.tradeRatio || { longPct: 50, shortPct: 50 };
    const pos = portfolio.openDemoPosition(ctx.from.id, {
      pairCode,
      ratioLongShort: ratio,
      entryPrice: price,
    });
    await ctx.editMessageText(
      `✅ Opened demo position \n• Pair: *${pairCode.replace('_', ' / ')}*\n• Entry: *${price}*\n• Ratio: *${ratio.longPct}/${ratio.shortPct}*\n• ID: 
${pos.id}`,
      { parse_mode: 'Markdown' }
    );
  });
};
