const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env if present (falls back to env.example guidance)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is missing in the environment. Please create a .env file based on env.example');
}

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN
};
