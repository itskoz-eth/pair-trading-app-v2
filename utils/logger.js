function timestamp() {
  return new Date().toISOString();
}

function info(...args) {
  console.log(timestamp(), '[INFO]', ...args);
}

function error(...args) {
  console.error(timestamp(), '[ERROR]', ...args);
}

module.exports = { info, error };
