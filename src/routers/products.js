import {getAllProducts } from "../handler/products.js"
import {Router} from "express"


const router = Router()

router.get("/products", getAllProducts)
