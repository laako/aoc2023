const R = require("ramda");
const { readRows, convertToNumber } = require("../utils");

const isNumber = R.compose(R.not, isNaN, convertToNumber);

const answer = R.compose(
  R.sum,
  R.map(
    R.compose(
      convertToNumber,
      R.converge((a, b) => `${a}${b}`, [R.find(isNumber), R.findLast(isNumber)])
    )
  )
)(readRows(__dirname));

console.log(answer);
