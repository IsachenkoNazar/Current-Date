import{ getProducts} from "..services/products.js"


export function getAllProducts(req, res){
	const { take } = req.query
	
    if (take) {
    const takeLimit = parseInt(take, 10);
    if (!isNaN(takeLimit) && takeLimit > 0) {
      result = result.slice(0, takeLimit);
    }
  }

	let products = getProducts()
	return res.status(200).json({result: products})
}
