const logger = require('./logger');

module.exports = (err, ctx) => {
  logger.error('Bot encountered an error:', err);
  if (ctx && typeof ctx.reply === 'function') {
    try {
      ctx.reply('⚠️ Oops! Something went wrong. Please try again.');
    } catch (_) {
      // intentionally ignore secondary errors
    }
  }
};
