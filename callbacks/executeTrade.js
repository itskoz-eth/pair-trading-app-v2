const hyperliquid = require('../services/hyperliquid');
const portfolio = require('../services/portfolio');

module.exports = (bot) => {
  // trade_LONG_SHORT e.g. trade_BTC_ETH means Long BTC / Short ETH
  bot.action(/^trade_([A-Z]+)_([A-Z]+)$/i, async (ctx) => {
    try {
      const longAsset = ctx.match[1].toUpperCase();
      const shortAsset = ctx.match[2].toUpperCase();
      const pairCode = `${longAsset}_${shortAsset}`;
      const price = hyperliquid.getMockPrice(pairCode);
      await ctx.answerCbQuery();
      const ratio = ctx.session?.tradeRatio || { longPct: 50, shortPct: 50 };
      const pos = portfolio.openDemoPosition(ctx.from.id, {
        pairCode,
        longAsset,
        shortAsset,
        ratioLongShort: ratio,
        entryPrice: price,
      });
      await ctx.reply(
        `✅ Opened demo position\n• Long: *${longAsset}* | Short: *${shortAsset}*\n• Synthetic price: *${price}*\n• Ratio (L/S): *${ratio.longPct}/${ratio.shortPct}*\n• ID: ${pos.id}`,
        { parse_mode: 'Markdown' }
      );
    } catch (err) {
      await ctx.reply('⚠️ Oops! Something went wrong opening that trade.');
    }
  });
};
