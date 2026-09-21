export const products = [
  {
    id: 1,
    name: "apple",
    price: 2,
    category: "food",
    image: "apple.png"
  },
  {
    id: 2,
    name: "table",
    price: 5,
    category: "furniture",
    image: "table.png"
  },
  {
    id: 3,
    name: "milk",
    price: 7,
    category: "drink",
    image: "milk_packet.png"
  },
  {
    id: 4,
    name: "laptop",
    price: 5,
    category: "device",
    image: "laptop.png"
  },
  {
    id: 5,
    name: "flower",
    price: 10,
    category: "plant",
    image: "plant.png"
  }
]


export function addProduct(newProduct, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        return reject(new Error("Our own Error"));
      }
      products.push(newProduct);
      resolve(newProduct);
    }, 1000);
  });
}


export function findProductById(id) {
  return products.find((product) => product.id === Number(id));
}


export function findProductByTitle(title) {
  return products.find(
    (product) => product.name.toLowerCase() === title.toLowerCase()
  );
}