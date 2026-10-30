async function requestPrediction(input) {
  return {
    input,
    prediction: null,
  };
}

module.exports = {
  requestPrediction,
};
