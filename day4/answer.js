const R = require("ramda");
const { readRows } = require("../utils");

const data = readRows(__dirname);

const convert = R.map(
  R.compose(
    R.length,
    R.converge(
      (winning, ticket) => R.filter(R.includes(R.__, ticket))(winning),
      [R.head, R.last]
    ),
    R.map(R.compose(R.split(/\s+/g), R.trim)),
    R.split("|"),
    R.last,
    R.split(":")
  )
);

const powOr1 = R.ifElse(
  R.equals(1),
  R.always(1),
  R.compose(R.partial(Math.pow, [2]), R.dec)
);

const result = R.compose(
  R.sum,
  R.map(powOr1),
  R.reject(R.equals(0)),
  convert
)(data);

console.log(result);
