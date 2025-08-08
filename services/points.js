// Minimal in-memory points & streaks for demo

const { getPoints, setPoints, getUserPrefs } = require('./store');
const userIdToStreak = new Map();
const userIdToLastWinDate = new Map();

function getUserPoints(userId) {
  return getPoints(userId) || 0;
}

function getUserStreak(userId) {
  return userIdToStreak.get(userId) || 0;
}

function addPoints(userId, delta) {
  const current = getUserPoints(userId);
  setPoints(userId, current + delta);
}

function recordWin(userId) {
  const today = new Date().toDateString();
  const last = userIdToLastWinDate.get(userId);
  if (last === today) {
    // already counted today, do nothing
  } else if (last && new Date(last) && daysBetween(new Date(last), new Date()) === 1) {
    userIdToStreak.set(userId, getUserStreak(userId) + 1);
  } else {
    userIdToStreak.set(userId, 1);
  }
  userIdToLastWinDate.set(userId, today);
}

function daysBetween(a, b) {
  const ms = 24 * 60 * 60 * 1000;
  return Math.floor((stripTime(b) - stripTime(a)) / ms);
}

function stripTime(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

module.exports = { getUserPoints, addPoints, getUserStreak, recordWin };


