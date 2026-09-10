const express = require("express")
const moment = require("moment")



const HOST = "localhost"
const PORT = 5000
const ENDPOINT = "timestamp/uptime/nodeVersion"


const information = express()

const stats = {
  version: process.version,
  uptimeSeconds: process.uptime(),
  timestamp: moment().toISOString()
}


information.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}/${ENDPOINT}`);
});

information.get(`/${ENDPOINT}`, (req, res) => {
  res.json({
    timestamp: moment().toISOString(),
    version: process.version,
    uptimeSeconds: process.uptime()
  });
});