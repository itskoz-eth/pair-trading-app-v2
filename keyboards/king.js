const { Markup } = require('telegraf');

const DEFAULT_ALTS = ['ETH', 'SOL', 'ARB', 'AVAX', 'OP'];

function kingAltListKeyboard(alts = DEFAULT_ALTS) {
  const rows = alts.map((s) => [Markup.button.callback(s, `king_pick_${s}`)]);
  rows.push([Markup.button.callback('⬅️ Back', 'nav_trade')]);
  return Markup.inlineKeyboard(rows);
}

function showKingAltList(ctx) {
  return ctx.reply('👑 Outlive the King: Choose ALT vs BTC', kingAltListKeyboard());
}

function kingDirectionKeyboard(altSymbol) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(`Long ${altSymbol} / Short BTC`, `trade_${altSymbol}_BTC`)],
    [Markup.button.callback(`Long BTC / Short ${altSymbol}`, `trade_BTC_${altSymbol}`)],
    [Markup.button.callback('⬅️ Choose another ALT', 'king_list')]
  ]);
}

function showKingDirections(ctx, altSymbol) {
  return ctx.reply(`👑 ${altSymbol} vs BTC — pick direction`, kingDirectionKeyboard(altSymbol));
}

module.exports = {
  showKingAltList,
  showKingDirections,
};


