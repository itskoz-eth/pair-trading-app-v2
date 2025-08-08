const { showMainMenu } = require('../keyboards/main');
const { showTradeMenu } = require('../keyboards/trade');
const marketMock = require('../services/marketMock');
const { Markup } = require('telegraf');
const { showKingAltList, showKingDirections } = require('../keyboards/king');

module.exports = (bot) => {
  bot.action('nav_main', async (ctx) => {
    await ctx.answerCbQuery();
    await showMainMenu(ctx);
  });

  bot.action('nav_trade', async (ctx) => {
    await ctx.answerCbQuery();
    await showTradeMenu(ctx);
  });

  // Placeholder for BTC-relative scanner entry
  bot.action('scan_vs_btc', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageText('📊 Top movers vs BTC (24h) — coming soon in demo.');
  });

  bot.action('nav_portfolio', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageText('📁 Your demo portfolio is currently empty.');
  });

  bot.action('nav_help', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageText('❓ Use /help at any time to see the command list.');
  });
  
  // Mock movers vs BTC scanner
  bot.action('scan_vs_btc', async (ctx) => {
    await ctx.answerCbQuery();
    const top = marketMock.getRelativeMoversVsBTC({ window: '24h', limit: 5 });
    const lines = ['📊 Top movers vs BTC (24h):', '', ...top.map((t, i) => `${i+1}. ${t.symbol}: ${(t.relative*100).toFixed(2)}%`), '', 'Tap below to open: Long ASSET / Short BTC'];
    const keyboard = Markup.inlineKeyboard(
      top.map(t => [Markup.button.callback(`${t.symbol}/BTC`, `trade_${t.symbol}_BTC`)]).concat([[Markup.button.callback('⬅️ Back', 'nav_trade')]])
    );
    await ctx.editMessageText(lines.join('\n'), keyboard);
  });

  // King flow (ALT vs BTC only)
  bot.action('king', async (ctx) => {
    await ctx.answerCbQuery();
    await showKingAltList(ctx);
  });
  bot.action(/^king_pick_([A-Z]+)$/i, async (ctx) => {
    await ctx.answerCbQuery();
    const alt = ctx.match[1].toUpperCase();
    await showKingDirections(ctx, alt);
  });
  bot.action('king_list', async (ctx) => {
    await ctx.answerCbQuery();
    await showKingAltList(ctx);
  });
};
