function info(message, meta) {
  console.log(message, meta ?? '');
}

function warn(message, meta) {
  console.warn(message, meta ?? '');
}

function error(message, meta) {
  console.error(message, meta ?? '');
}

module.exports = {
  info,
  warn,
  error,
};
