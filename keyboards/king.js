const { Markup } = require('telegraf');

const DEFAULT_ALTS = ['ETH', 'SOL', 'ARB', 'AVAX', 'OP'];

function kingAltListKeyboard(alts = DEFAULT_ALTS) {
  const rows = alts.map((s) => [Markup.button.callback(s, `king_pick_${s}`)]);
  rows.unshift([Markup.button.callback('⭐ Favorites', 'king_favs')]);
  rows.unshift([Markup.button.callback('Sectors: L1', 'king_cat_L1'), Markup.button.callback('L2', 'king_cat_L2')]);
  rows.unshift([Markup.button.callback('🔎 Search', 'king_search')]);
  rows.push([Markup.button.callback('⬅️ Back', 'nav_trade')]);
  return Markup.inlineKeyboard(rows);
}

function showKingAltList(ctx, alts) {
  return ctx.reply('👑 Outlive the King: Choose ALT vs BTC', kingAltListKeyboard(alts && alts.length ? alts : DEFAULT_ALTS));
}

function kingDirectionKeyboard(altSymbol) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(`Long ${altSymbol} / Short BTC`, `trade_${altSymbol}_BTC`)],
    [Markup.button.callback(`Long BTC / Short ${altSymbol}`, `trade_BTC_${altSymbol}`)],
    [Markup.button.callback('⭐ Toggle Favorite', `fav_${altSymbol}`)],
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


