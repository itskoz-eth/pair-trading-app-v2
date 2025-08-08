const { Telegraf, session } = require('telegraf');
const { BOT_TOKEN } = require('./config');
const logger = require('./utils/logger');
const errorHandler = require('./utils/errorHandler');

const bot = new Telegraf(BOT_TOKEN);

// In-memory session for per-user state (e.g., ratio)
bot.use(session());

// Initialize defaults
bot.use(async (ctx, next) => {
  if (!ctx.session) ctx.session = {};
  if (!ctx.session.tradeRatio) {
    ctx.session.tradeRatio = { longPct: 50, shortPct: 50 };
  }
  await next();
});

// Register command modules
['start', 'trade', 'portfolio', 'help'].forEach((cmd) => {
  require(`./commands/${cmd}`)(bot);
});

// Register callback handler modules
['navigation', 'executeTrade', 'customPair', 'ratio', 'portfolio'].forEach((cb) => {
  require(`./callbacks/${cb}`)(bot);
});

bot.catch(errorHandler);

// Ensure no webhook is set when using long polling (prevents 409 conflicts)
async function startBot() {
  try {
    await bot.telegram.deleteWebhook({ drop_pending_updates: true });
  } catch (err) {
    logger.error('Failed to delete webhook (continuing):', err.message || err);
  }
  await bot.launch();
  logger.info('🤖 HyperPairs Bot running...');
}

startBot();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
