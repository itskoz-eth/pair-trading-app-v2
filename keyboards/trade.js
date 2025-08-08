const { Markup } = require('telegraf');

function tradeMenuMarkup() {
  return Markup.inlineKeyboard([
    [Markup.button.callback('🔍 Movers vs BTC (24h)', 'scan_vs_btc')],
    [Markup.button.callback('📈 Movers vs BTC (1w)', 'scan_vs_btc_1w')],
    [Markup.button.callback('👑 Outlive the King (ALTs vs BTC)', 'king')],
    [
      Markup.button.callback('50/50', 'ratio_set_50_50'),
      Markup.button.callback('60/40', 'ratio_set_60_40'),
      Markup.button.callback('70/30', 'ratio_set_70_30')
    ],
    [
      Markup.button.callback('−5%', 'ratio_dec'),
      Markup.button.callback('+5%', 'ratio_inc')
    ],
    [Markup.button.callback('⬅️ Back', 'nav_main')]
  ]);
}

function showTradeMenu(ctx) {
  return ctx.reply('📈 Trading Hub', tradeMenuMarkup());
}

module.exports = {
  tradeMenuMarkup,
  showTradeMenu
};
