const HttpStatus = require('http-status-codes');

const { ProductModel } = require('../models');

async function createProduct(req, res, next) {
    try {
        const {
            shop_id,
            name,
            description,
            type,
            status,
            quantity,
            colors,
            sizes
        } = req.body;
    
        const product = await ProductModel.create({
            shop_id,
            name,
            description,
            type,
            status,
            quantity,
            colors,
            sizes
        });

        return res.status(HttpStatus.NOT_FOUND).json({ data: product });
    } catch (error) {
        return next(error);
    }
}

async function getProduct(req, res, next) {

}

async function updateProduct(req, res, next) {

}

async function deleteProduct(req, res, next) {

}

async function getProducts(req, res, next) {

}

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
};
