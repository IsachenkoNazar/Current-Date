const express = require("express")
const moment = require("moment")



const HOST = "localhost"
const PORT = 5000
const ENDPOINT = "timestamp/uptime/nodeVersion"
const ENDPOINT1 = "status"


const information = express()

const stats = {
  version: process.version,
  uptimeSeconds: process.uptime(),
  timestamp: moment().toISOString()
}


information.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}/${ENDPOINT}/${ENDPOINT1}`);
});

information.get(`/${ENDPOINT}`, (req, res) => {
  res.json({
    timestamp: moment().toISOString(),
    version: process.version,
    uptimeSeconds: process.uptime()
  });
});

information.get(`/${ENDPOINT1}`, (req, res) => {
  res.status(200).json({
    "status": "ok"
  });
});