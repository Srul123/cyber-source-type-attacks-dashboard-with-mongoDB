function calculateAverageByFactor(arr = Array, factor = Number) {
  const sum = arr.reduce((cur, acc) => cur + acc);
  return parseInt(sum / factor);
}

function getObjectKeysAsString(object = Object) {
  const keyStrAns = {};
  for (const [key, value] of Object.entries(object)) {
    keyStrAns[key] = key;
  }
  return keyStrAns;
}

module.exports = {
  calculateAverageByFactor,
  getObjectKeysAsString,
};
