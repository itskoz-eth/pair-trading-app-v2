const { showTradeMenu } = require('../keyboards/trade');

module.exports = (bot) => {
  bot.command('trade', (ctx) => showTradeMenu(ctx));
};
