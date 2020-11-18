const Joi = require('joi');
const config = require('config');

const status = config.get('validation.product.status');

const { string, number, array } = Joi.types();

const productIdSchema = Joi.object({
    params: Joi.object({
        productId: number.integer().required(),
    }),
});


const productsCreateSchema = Joi.object({
    body: Joi.object({
        shop_id: number.integer().required(),
        name: string.trim().max(200).required(),
        description: string.trim().max(500),
        type: string.trim().max(200).required(),
        status: string.valid(...status).trim(),
        quantity: number.integer().required(),
        colors: array.items(
            Joi.object({
                color: string.trim().max(200).required(),
                price: number.integer().required(),
                quantity: number.integer().required(),
            }).required()
        ),
        sizes: array.items(string)
    }),
});
  
const productsUpdateSchema = Joi.object({
    body: Joi.object({
        shop_id: number.integer().required(),
        name: string.trim().max(200).required(),
        description: string.trim().max(500),
        type: string.trim().max(200).required(),
        status: string.valid(...status).trim(),
        quantity: number.integer().required(),
        colors: array.items(
            Joi.object({
                color: string.trim().max(200).required(),
                price: number.integer().required(),
                quantity: number.integer().required(),
            }).required()
        ),
        sizes: array.items(string)
    }),
});
  


module.exports = {
    productsCreateSchema,
    productIdSchema,
    productsUpdateSchema
}