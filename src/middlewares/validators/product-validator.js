const { ProductSchemas } = require('./schemas');
const { ValidationHandlerUtil } = require('../../utils');

function validateCreateProduct(req, res, next) {
  return ValidationHandlerUtil.validate(ProductSchemas.productsCreateSchema, req, next);
}

function validateProductId(req, res, next) {
  return ValidationHandlerUtil.validate(ProductSchemas.productIdSchema, req, next);
}

function validateUpdateProduct(req, res, next) {
  return ValidationHandlerUtil.validate(ProductSchemas.productsUpdateSchema, req, next);
}

module.exports = {
  validateCreateProduct,
  validateProductId,
  validateUpdateProduct,
};