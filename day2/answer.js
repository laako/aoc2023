const { readRows, convertToNumber, readCalibration } = require("../utils");
const R = require("ramda");

const data = readRows(__dirname);

// Part 1
const greaterThanRed = R.compose(R.flip(R.gt)(12), R.prop("red"));
const greaterThanGreen = R.compose(R.flip(R.gt)(13), R.prop("green"));
const greaterThanBlue = R.compose(R.flip(R.gt)(14), R.prop("blue"));

const isValidGame = R.compose(
  R.complement(R.includes)(true),
  R.map(
    R.compose(
      R.anyPass([greaterThanBlue, greaterThanGreen, greaterThanRed]),
      R.fromPairs,
      R.map(
        R.compose(R.adjust(1, convertToNumber), R.reverse, R.split(" "), R.trim)
      ),
      R.split(",")
    )
  ),
  R.split(";")
);

const readGameIndex = R.compose(convertToNumber, R.last, R.split(" "), R.head);

const result1 = R.compose(
  R.sum,
  R.map(readGameIndex),
  R.filter(R.last),
  R.map(R.compose(R.adjust(1, isValidGame), R.split(":")))
)(data);

// Part 2
const power = R.compose(
  R.reduce(R.multiply, 1),
  R.values,
  R.reduce((acc, cur) => R.mergeWith(R.max, acc, cur), {
    blue: 0,
    red: 0,
    green: 0,
  }),
  R.map(
    R.compose(
      R.fromPairs,
      R.map(
        R.compose(R.adjust(1, convertToNumber), R.reverse, R.split(" "), R.trim)
      ),
      R.split(",")
    )
  ),
  R.split(";")
);

const result2 = R.compose(
  R.sum,
  R.map(R.compose(power, R.last, R.split(":")))
)(data);

console.log({ result1, result2 });
