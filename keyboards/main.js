const { Markup } = require('telegraf');

function mainMenuMarkup() {
  return Markup.inlineKeyboard([
    [Markup.button.callback('📈 Trade', 'nav_trade')],
    [Markup.button.callback('📁 Portfolio', 'nav_portfolio')],
    [Markup.button.callback('❓ Help', 'nav_help')],
    [Markup.button.callback('🔧 Custom Setup', 'custom_pair')]
  ]);
}

function showMainMenu(ctx) {
  return ctx.reply('📊 Welcome to HyperPairs!\nChoose an option:', mainMenuMarkup());
}

module.exports = {
  mainMenuMarkup,
  showMainMenu
};
