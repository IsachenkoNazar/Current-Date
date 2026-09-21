import { getAllProducts, createNewProduct, findProductById } from  ".../repositories/products.js"

export function getProducts(take) {
    return getAllProducts(take)
}

export function findProduct(id) {
    return findProductById(id)
}

export function createProduct(data) {
    let { title, price, description } = data;

    if(findProductByTitle(title)) {
        return null;
    }

    const products = getAllProducts();
    let product = {
        id: products.length + 1,
        title: title,
        price: price,
        description: description
    };

    createNewProduct(product);
}

