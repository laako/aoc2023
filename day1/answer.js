const R = require("ramda");
const { readRows, convertToNumber } = require("../utils");

// Part 1
const isNumber = R.compose(R.complement(isNaN), convertToNumber);

const answer = R.compose(
  R.sum,
  R.map(
    R.compose(
      convertToNumber,
      R.converge((a, b) => `${a}${b}`, [R.find(isNumber), R.findLast(isNumber)])
    )
  )
)(readRows(__dirname));

// Part 2
const answer2 = R.compose(
  R.sum,
  R.map(
    R.pipe(
      R.replace(/one/g, "o1e"),
      R.replace(/two/g, "t2o"),
      R.replace(/three/g, "t3e"),
      R.replace(/four/g, "4"),
      R.replace(/five/g, "5e"),
      R.replace(/six/g, "6"),
      R.replace(/seven/g, "7"),
      R.replace(/eight/g, "e8t"),
      R.replace(/nine/g, "9e"),
      R.match(/\d/g),
      R.converge((a, b) => `${a}${b}`, [R.head, R.last]),
      convertToNumber
    )
  )
)(readRows(__dirname, "2"));

console.log({
  part1: answer,
  part2: answer2,
});
