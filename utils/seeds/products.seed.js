const mongoose = require('mongoose');
const Product = require('../../models/Products');
const fs = require('fs');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {

    const allProducts = await Product.find();

    if (allProducts.length) {
        await Product.collection.drop();
    }
}).catch(err => {
    console.log(`Ha habido un error eliminando los datos: ${err}`);
})
.then(async () => {
    const data = fs.readFileSync('./utils/seeds/db/products.json');
    const parsedData = JSON.parse(data);
    const productDocs = parsedData.map((product) => {
        return new Product(product);
    });
    await Product.insertMany(productDocs);
})
.catch((err) => {
    console.log(`Ha habido un error aÃ±adiendo los elementos a la base de datos: ${err}`);
})
.finally(() => mongoose.disconnect());