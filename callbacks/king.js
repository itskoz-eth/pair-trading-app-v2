const { showKingAltList, showKingDirections } = require('../keyboards/king');
const { universe } = require('../services/marketMock');

const userFavs = new Map(); // demo favorites per user id

function getFavs(userId) {
  if (!userFavs.has(userId)) userFavs.set(userId, new Set(['ETH', 'SOL']));
  return userFavs.get(userId);
}

module.exports = (bot) => {
  // Category filters
  bot.action(/^king_cat_(L1|L2)$/i, async (ctx) => {
    await ctx.answerCbQuery();
    const cat = ctx.match[1].toUpperCase();
    const alts = universe.filter(a => a.symbol !== 'BTC' && a.sector === cat).map(a => a.symbol);
    await showKingAltList(ctx, alts);
  });

  // Favorites list
  bot.action('king_favs', async (ctx) => {
    await ctx.answerCbQuery();
    const favs = Array.from(getFavs(ctx.from.id));
    if (favs.length === 0) return ctx.reply('No favorites yet. Pick coins and we will add soon.');
    await showKingAltList(ctx, favs);
  });

  // Toggle favorite (future improvement)
  bot.action(/^fav_(\w+)$/i, async (ctx) => {
    await ctx.answerCbQuery();
    const sym = ctx.match[1].toUpperCase();
    const favs = getFavs(ctx.from.id);
    if (favs.has(sym)) favs.delete(sym); else favs.add(sym);
    await ctx.reply(`⭐ Favorites updated: ${Array.from(favs).join(', ')}`);
  });
};


