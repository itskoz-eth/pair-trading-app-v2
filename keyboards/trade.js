const { Markup } = require('telegraf');

function tradeMenuMarkup() {
  return Markup.inlineKeyboard([
    [Markup.button.callback('🔍 Movers vs BTC (24h)', 'scan_vs_btc')],
    [Markup.button.callback('BTC 🔄 ETH', 'trade_BTC_ETH')],
    [Markup.button.callback('SOL 🔄 ETH', 'trade_SOL_ETH')],
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
  return ctx.reply('📈 Select a pair to trade:', tradeMenuMarkup());
}

module.exports = {
  tradeMenuMarkup,
  showTradeMenu
};
