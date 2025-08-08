const points = require('../services/points');

module.exports = (bot) => {
  bot.command('points', (ctx) => {
    const score = points.getUserPoints(ctx.from.id);
    const streak = points.getUserStreak(ctx.from.id);
    ctx.reply(`🎯 Points: ${score}\n🔥 Streak: ${streak} day(s)`);
  });
};


