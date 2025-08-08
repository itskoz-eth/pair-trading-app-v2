const { showKingAltList, showKingDirections } = require('../keyboards/king');
const { universe } = require('../services/marketMock');
const { getUserPrefs, setFavorites } = require('../services/store');

module.exports = (bot) => {
  // Search flow: ask user to type a symbol
  bot.action('king_search', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('🔎 Type a symbol (e.g., ETH, SOL).');
    ctx.session.awaitingKingSearch = true;
  });

  bot.on('text', async (ctx, next) => {
    if (!ctx.session?.awaitingKingSearch) return next();
    ctx.session.awaitingKingSearch = false;
    const q = (ctx.message.text || '').trim().toUpperCase();
    const found = universe.filter(a => a.symbol !== 'BTC' && a.symbol.includes(q)).map(a => a.symbol);
    if (found.length === 0) {
      await ctx.reply('No matches. Try another symbol.');
      return;
    }
    await showKingAltList(ctx, found.slice(0, 20));
  });
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
    const favs = getUserPrefs(ctx.from.id).favorites;
    if (favs.length === 0) return ctx.reply('No favorites yet. Pick coins and we will add soon.');
    await showKingAltList(ctx, favs);
  });

  // Toggle favorite (future improvement)
  bot.action(/^fav_(\w+)$/i, async (ctx) => {
    await ctx.answerCbQuery();
    const sym = ctx.match[1].toUpperCase();
    const prefs = getUserPrefs(ctx.from.id);
    const next = new Set(prefs.favorites || []);
    if (next.has(sym)) next.delete(sym); else next.add(sym);
    const saved = setFavorites(ctx.from.id, Array.from(next));
    await ctx.reply(`⭐ Favorites updated: ${saved.join(', ')}`);
  });
};


