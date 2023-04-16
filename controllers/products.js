const Products = require('../models/products'); // importing the products database model
const StatusCodes = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const img_path = '../img/Products';

const getAllProducts = async (req, res) => {

    // applying qureies to our search
    const { featured, sale, name, numericFilters, categories, fields, limit, sort } = req.query;

    var queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if (sale) {
        queryObject.sale = sale === 'true' ? true : false;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }; // to make search case insensitive
    }

    if (categories) {
        queryObject.$or = []

        categories.split(',').forEach((cat) => {

            cat = cat.toLowerCase();
            let obj = { category: cat };
            queryObject.$or.push(obj)
        })
    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
            '!=': '$ne'
        };
        const regEx = /\b(<|>|>=|=|<|<=|!=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating', '_id'];

        queryObject.$and = [];

        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                if (field === '_id') {
                    queryObject[field] = { [operator]: value }
                    queryObject.$and.push({})
                }
                else {
                    let obj = {}
                    obj[field] = { [operator]: Number(value) };
                    queryObject.$and.push(obj);

                }
            }
        });
    }
    // fetching the values

    let result = Products.find(queryObject)

    // sort
    if (sort) {
        const sortList = sort.split(',').join(' ');

        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    if (limit) {
        result = result.limit(limit);
    }

    const products = await result;
    res.status(StatusCodes.OK).json({ nbHits: products.length, products })
}

const createProduct = async (req, res) => {

    // *changing image paths, 
    req.body.image = path.join(img_path, req.body.image);

    if (req.body.small_Images) {
        req.body.small_Images = req.body.small_Images.map((element) => {
            return path.join(img_path, element);
        })
    }

    req.body.category = req.body.category.map((element) => {
        return element.toLowerCase();
    })

    const product = await Products.create(req.body);
    res.status(StatusCodes.CREATED).json({success: true,  product, msg: "Product added successfully!" });
}
const getSingleProduct = async (req, res) => {
    const { id: productID } = req.params;
    const product = await Products.findOne({ _id: productID });

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productID}`);
    }
    res.status(StatusCodes.OK).json({ product });
}
const updateProduct = async (req, res) => {
    const { id: productID } = req.params;
    const product = await Products.findOneAndUpdate({ _id: productID }, req.body,
        { new: true, runValidators: true });

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productID}`);
    }
    res.status(StatusCodes.OK).json({ product });
}
const deleteProduct = async (req, res) => {
    const { id: productID } = req.params;
    const product = await Products.findOneAndRemove({ _id: productID });

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productID}`);
    }
    res.status(StatusCodes.OK).json({ deleted: true });
}

module.exports = {
    getAllProducts, createProduct,
    getSingleProduct, updateProduct, deleteProduct
}