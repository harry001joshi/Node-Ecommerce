require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/products')
const path = require('path')

// const jsonProducts = require('./data/products.json')
const jsonProducts = require('./data/reset.json')
const img_path = '../img/Products';

for (eachProd of jsonProducts) {
    eachProd.image = path.join(img_path, eachProd.image);

    if (eachProd.small_Images) {
        eachProd.small_Images = eachProd.small_Images.map((element) => {
            return path.join(img_path, element);
        })
    }

    eachProd.category = eachProd.category.map((element) => {
        return element.toLowerCase();
    })

}


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('Reset Successfull!!!!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()
