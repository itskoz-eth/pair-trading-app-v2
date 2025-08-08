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

bot.launch().then(() => logger.info('🤖 HyperPairs Bot running...'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
