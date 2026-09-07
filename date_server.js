const express = require("express")
const moment = require("moment")


const HOST = "localhost"
const PORT = 5000
const ENDPOINT = "timestamp"

const date = express()

date.getCurrentDay = function() {
    return (moment().format('dddd'))
};

date.getCurrentMonth = function() {
   return moment().format("MMM")
};

date.getCurrentYear = function() {
    return moment().format("YYYY")
};

date.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}/${ENDPOINT}`);
});

date.get(`/${ENDPOINT}`, (req, res) => {
  res.json({
    day: date.getCurrentDay(),
    month: date.getCurrentMonth(),
    year: date.getCurrentYear()
  });
});







