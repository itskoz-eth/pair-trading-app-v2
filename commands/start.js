const { showMainMenu } = require('../keyboards/main');

module.exports = (bot) => {
  bot.command('start', (ctx) => showMainMenu(ctx));
};
