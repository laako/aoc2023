const fs = require("fs");
const R = require("ramda");

const data = fs.readFileSync(__dirname + "/input.txt", "utf-8");

const convertToNumber = R.partialRight(parseInt, [10]);
const isNumber = R.compose(R.not, isNaN, convertToNumber);

const answer = R.compose(
  R.sum,
  R.map(
    R.compose(
      convertToNumber,
      R.converge((a, b) => `${a}${b}`, [R.find(isNumber), R.findLast(isNumber)])
    )
  ),
  R.filter(R.complement(R.isEmpty)),
  R.split(/\r?\n/)
)(data);

console.log(answer);
