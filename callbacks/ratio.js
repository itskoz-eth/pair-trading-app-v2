function clampRatio(value) {
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
}

module.exports = (bot) => {
  bot.action('ratio_set_50_50', async (ctx) => {
    await ctx.answerCbQuery();
    ctx.session.tradeRatio = { longPct: 50, shortPct: 50 };
    await ctx.reply('⚖️ Ratio set to 50/50');
  });

  bot.action('ratio_set_60_40', async (ctx) => {
    await ctx.answerCbQuery();
    ctx.session.tradeRatio = { longPct: 60, shortPct: 40 };
    await ctx.reply('⚖️ Ratio set to 60/40');
  });

  bot.action('ratio_set_70_30', async (ctx) => {
    await ctx.answerCbQuery();
    ctx.session.tradeRatio = { longPct: 70, shortPct: 30 };
    await ctx.reply('⚖️ Ratio set to 70/30');
  });

  bot.action('ratio_inc', async (ctx) => {
    await ctx.answerCbQuery();
    const ratio = ctx.session.tradeRatio || { longPct: 50, shortPct: 50 };
    const longPct = clampRatio(ratio.longPct + 5);
    const shortPct = clampRatio(100 - longPct);
    ctx.session.tradeRatio = { longPct, shortPct };
    await ctx.reply(`⚖️ Ratio set to ${longPct}/${shortPct}`);
  });

  bot.action('ratio_dec', async (ctx) => {
    await ctx.answerCbQuery();
    const ratio = ctx.session.tradeRatio || { longPct: 50, shortPct: 50 };
    const longPct = clampRatio(ratio.longPct - 5);
    const shortPct = clampRatio(100 - longPct);
    ctx.session.tradeRatio = { longPct, shortPct };
    await ctx.reply(`⚖️ Ratio set to ${longPct}/${shortPct}`);
  });
};


