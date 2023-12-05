const fs = require("fs");
const R = require("ramda");

const readRows = (dir) =>
  R.split(/\r?\n/, fs.readFileSync(dir + "/input.txt", "utf-8"));

const readCalibration = (dir) =>
  R.split(/\r?\n/, fs.readFileSync(dir + "/calibration.txt", "utf-8"));

const convertToNumber = R.partialRight(parseInt, [10]);

module.exports = { readRows, readCalibration, convertToNumber };
