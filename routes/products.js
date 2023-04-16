const express = require('express')
const { getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct } = require('../controllers/products');

const router = express.Router();

/* 

TODO: Following api routes we're going to create

* GET ---> getAllProducts --> /api/v1/products
* POST ---> createProduct --> /api/v1/products
* GET ---> getSingleProduct --> /api/v1/products/:id
* PATCH ---> updateProduct --> /api/v1/products/:id
* DELETE ---> deleteProduct --> /api/v1/products/:id


*/

router.route('/')
    .get(getAllProducts)
    .post(createProduct)

router.route('/:id')
    .get(getSingleProduct)
    .patch(updateProduct)
    .delete(deleteProduct)

module.exports = router;