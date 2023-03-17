const mongoose = require('mongoose');
const Toy = require('../../models/Toys.js');
const fs = require('fs');

const DB_URL = "mongodb+srv://root:7GBDSVHdMtJTfjZY@nodejs-proyectodb.ihshpoy.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {

    const allToys = await Toy.find();

    if (allToys.length) {
        await Toy.collection.drop();
    }
}).catch(err => {
    console.log(`Ha habido un error eliminando los datos: ${err}`);
})
.then(async () => {
    const data = fs.readFileSync('./utils/seeds/db/toys.json');
    const parsedData = JSON.parse(data);
    const toyDocs = parsedData.map((toy) => {
        return new Toy(toy);
    });
    await Toy.insertMany(toyDocs);
})
.catch((err) => {
    console.log(`Ha habido un error añadiendo los elementos a la base de datos: ${err}`);
})
.finally(() => mongoose.disconnect());