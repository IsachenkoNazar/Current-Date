
import express from "express"
import moment from "moment"
import { products, addProduct } from "./src/repositories/products.js"

const HOST = "localhost"
const PORT = 5000
const ENDPOINT = "timestamp/uptime/nodeVersion"
const ENDPOINT1 = "status"

const information = express()

information.use(express.json())



information.get('/products', (req, res) => {
  const { category, take, fail, image } = req.query;

  if (image !== undefined && (typeof image !== "string" || image.trim().length === 0)) {
    return res.status(422).json({ ok: false, description: "Valid Error" });
  }

  if (fail === "true") {
    return res.status(500).json({ ok: false, error: "Our own error" });
  }

  let result = category 
    ? products.filter(p => p.category === category) 
    : [...products];

  if (take) {
    const takeLimit = parseInt(take, 10);
    if (!isNaN(takeLimit) && takeLimit > 0) {
      result = result.slice(0, takeLimit);
    }
  }

  res.status(200).json({ products: result });
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


information.post('/products', async (req, res) => {
  const {name, price, category, image} = req.body
  const {fail} = req.query
  try {  
    if ((typeof name != "string" || name.trim().length == 0) || (!Number.isInteger(price) || price <= 0) || (typeof category !== "string" || category.trim().length === 0)) {
      return res.status(422).json({ok: false, description: "Valid Error"})
    }
    if ((products.some(product => product.name === name))){
      return res.status(409).json({ok: false, description: "Product with that name already exsist"})
    }
    
    const newProduct = {
      id: products.length + 1,
      name: name,
      price: price,
      category: category,
      image: image
    }
    
    await addProduct(newProduct)
    res.status(201).json({ok: true, product: newProduct})

  } catch {
    return res.status(500).json({
      ok: false,
      error: "Our own error"
    })
  }
})


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
  console.log(`Products list  on http://${HOST}:${PORT}/products?fail=true`);
})