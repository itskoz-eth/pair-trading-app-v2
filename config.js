const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env if present
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const BOT_TOKEN =
  process.env.BOT_TOKEN ||
  process.env.TELEGRAM_BOT_TOKEN ||
  process.env.TOKEN;

if (!BOT_TOKEN) {
  // Clear, deployment-friendly error with exact steps
  console.error(
    'FATAL: BOT_TOKEN missing. On Railway: Service → Variables → New Variable → Name: BOT_TOKEN, Value: <your token>. Then Redeploy.'
  );
  process.exit(1);
}

module.exports = {
  BOT_TOKEN
};
