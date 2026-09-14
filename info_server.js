const express = require("express")
const moment = require("moment")



const HOST = "localhost"
const PORT = 5000
const ENDPOINT = "timestamp/uptime/nodeVersion"
const ENDPOINT1 = "status"

const information = express() //

const products = [
  {
    id: 1,
    name: "apple",
    price: 2,
    category: "food"
  },
  {
    id: 2,
    name: "table",
    price: 5,
    category: "furniture"
  },
  {
    id: 3,
    name: "milk",
    price: 7,
    category: "drink"
  },
  {
    id: 4,
    name: "laptop",
    price: 5,
    category: "device"
  },
  {
    id: 5,
    name: "flower",
    price: 10,
    category: "plant"
  }
]

information.get('/products', (req, res) => {
    const { category, take } = req.query;

    let result = category 
        ? products.filter(p => p.category === category) 
        : [...products];

    if (take) {
        const takeLimit = parseInt(take, 10);
        if (!isNaN(takeLimit) && takeLimit > 0) {
            result = result.slice(0, takeLimit);
        }
    }

    res.status(200).json({
        products: result
    });
});


information.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({
            ok: false,
            description: "Product not found."
        });
    }

    res.status(200).json(product);
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


information.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}/${ENDPOINT}`);
  console.log(`Check your status on http://${HOST}:${PORT}/${ENDPOINT1}`);
  console.log(`Products list on http://${HOST}:${PORT}/products`);
});