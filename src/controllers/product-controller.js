const HttpStatus = require('http-status-codes');
const { Op } = require('sequelize');

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
      sizes,
    } = req.body;
    
    const product = await ProductModel.create({
      shop_id,
      name,
      description,
      type,
      status,
      quantity,
      colors,
      sizes,
    });

    return res.status(HttpStatus.OK).json({ data: product });
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
      sizes,
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
        sizes,
      },
      {  
        where: {id: productId},
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
      { status: 'deleted' },
      { where: {id: productId} }
    );

    if (!product[0]) {
      throw new NotFoundError('Product is not found');
    }

    return ResponseHandlerUtil.handleDelete(res);
  } catch(error) {
    next(error);
  } 

}

async function getAvailableProducts(req, res, next) {
  const { limit, offset } = req.query;

  try {
    if (limit) {
      limits = {
        offset: (offset) ? parseInt(offset) : 0,
        limit: parseInt(limit),
      };
    }
    const products = await ProductModel.findAndCountAll({
      limits,
      where: {
        quantity: {
          [Op.gte]: 1,
        },
        status: 'active',
      },
    });

    if (!products) {
      throw new NotFoundError('Product is not found');
    }

    return res.status(HttpStatus.OK).json({ data: products });
  } catch(error) {
    next(error);
  }
}

module.exports = {
  getAvailableProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
