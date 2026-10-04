module.exports = (bot) => {
  bot.action('custom_pair', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageText('🔧 Custom setup coming soon!');
  });
};
