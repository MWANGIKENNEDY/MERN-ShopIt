const connectDatabase = require('../config/databaseConfig');
const Product = require('../models/product');
const products = require('../data/products.json')


connectDatabase();
const seedProducts = async () => {
    try{
        await Product.deleteMany();
        console.log("All items in database deleted");
        await Product.insertMany(products);
        console.log("Inserted multiple data to database");
        process.exit();

    }catch(error){

        console.log(error);
        process.exit();

    }
}


seedProducts();