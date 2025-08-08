module.exports = (bot) => {
  bot.command('help', (ctx) => {
    ctx.reply(`❓ *HyperPairs Help*

• Use /start to open the main menu.
• Use /trade to practise opening a long & short pair (default 50/50; adjust ratio via buttons).
• Use /portfolio to view and close your demo positions, with P&L.
• Use /points to view your score (demo).
• Inline buttons guide navigation.\n\nThis is a demo; no real funds are used.`, { parse_mode: 'Markdown' });
  });
};
