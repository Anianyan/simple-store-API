const HttpStatus = require('http-status-codes');

const { ProductModel } = require('../models');
const { NotFoundError } = require('../errors');
const { ResponseHandlerUtil } = require('../utils');

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
    const { productId } = req.params;

    try {
        const product = await ProductModel.findByPk(productId);

        if (!product) {
            throw new NotFoundError('Product not found');
        }

        return ResponseHandlerUtil.handleGet(res, product);
    } catch (error) {
        return next(error);
    }
}

async function updateProduct(req, res, next) {
    try {
        const { productId } = req.params;
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
    
        const product = await ProductModel.update(
            {
                shop_id,
                name,
                description,
                type,
                status,
                quantity,
                colors,
                sizes
            },
            {  
                where: {id: productId}
            }
        );

        if (!product) {
            throw new NotFoundError('Product is not found');
        }

        return res.status(HttpStatus.NOT_FOUND).json({ data: product });
    } catch (error) {
        return next(error);
    }
}

async function deleteProduct(req, res, next) {
    const { productId } = req.params;

    try {
        const product = await ProductModel.update(
            { status: "not-available" },
            { where: {id: productId} }
        );

        console.log('product', product);
        if (!product[0]) {
            throw new NotFoundError('Product is not found');
        }

        return ResponseHandlerUtil.handleDelete(res);
    } catch(error) {
        next(error);
    } 

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
