const { Markup } = require('telegraf');
const portfolio = require('../services/portfolio');
const hyperliquid = require('../services/hyperliquid');

function renderPortfolio(ctx) {
  const userId = ctx.from.id;
  const data = portfolio.getUserPortfolio(userId);
  const unreal = portfolio.getUnrealizedPnlSnapshot(userId);
  if (!data.positions.length) {
    return ctx.reply('📁 Your demo portfolio is empty. Use /trade to open a position.');
  }

  const lines = [
    '📁 Your Demo Portfolio',
    `• Realized P&L: ${data.realizedPnl.toFixed(2)}`,
    `• Unrealized P&L: ${unreal.toFixed(2)}`,
    '',
    ...data.positions.map((p, i) => `#${i + 1} Long ${p.longAsset} / Short ${p.shortAsset} | Size ${p.sizeNotional || 100} | Entry ${p.entryPrice} | Ratio ${p.ratioLongShort.longPct}/${p.ratioLongShort.shortPct} | ID ${p.id}`)
  ];

  const keyboard = Markup.inlineKeyboard(
    data.positions.map((p) => [
      Markup.button.callback(`−25% ${p.id.slice(0,4)}`, `reduce25_${p.id}`),
      Markup.button.callback(`−50%`, `reduce50_${p.id}`),
      Markup.button.callback(`Flip`, `flip_${p.id}`),
      Markup.button.callback(`Close`, `close_${p.id}`)
    ])
  );
  return ctx.reply(lines.join('\n'), keyboard);
}

module.exports = (bot) => {
  bot.command('portfolio', (ctx) => renderPortfolio(ctx));
};
