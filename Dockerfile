FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --no-fund --no-audit

COPY . .

# Expect BOT_TOKEN provided via environment
ENV NODE_ENV=production

CMD ["node", "bot.js"]


