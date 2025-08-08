const fs = require('fs');
const path = require('path');

const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORE_FILE)) {
    fs.writeFileSync(STORE_FILE, JSON.stringify({ users: {} }, null, 2), 'utf8');
  }
}

function readStore() {
  ensureStore();
  try {
    const raw = fs.readFileSync(STORE_FILE, 'utf8');
    return JSON.parse(raw || '{"users":{}}');
  } catch {
    return { users: {} };
  }
}

function writeStore(data) {
  ensureStore();
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function getUserPrefs(userId) {
  const store = readStore();
  const id = String(userId);
  if (!store.users[id]) {
    store.users[id] = { favorites: [] };
    writeStore(store);
  }
  return store.users[id];
}

function setFavorites(userId, favorites) {
  const store = readStore();
  const id = String(userId);
  if (!store.users[id]) store.users[id] = { favorites: [] };
  store.users[id].favorites = Array.from(new Set(favorites.map((s) => s.toUpperCase())));
  writeStore(store);
  return store.users[id].favorites;
}

module.exports = { getUserPrefs, setFavorites };


