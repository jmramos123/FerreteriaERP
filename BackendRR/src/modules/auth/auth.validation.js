function validateLoginPayload(payload) {
  return Boolean(payload && payload.email && payload.password);
}

module.exports = {
  validateLoginPayload,
};
