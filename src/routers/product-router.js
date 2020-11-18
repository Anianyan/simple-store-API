const express = require('express');

const router = express.Router();

const {
    validateCreateProduct,
    validateProductId,
    validateUpdateProduct
} = require('../middlewares/validators/product-validator');

const {
    getAvailableProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product-controller');

router.post('/', validateCreateProduct, createProduct);
router.get('/:productId', validateProductId, getProduct);
router.patch('/:productId', validateUpdateProduct, updateProduct);
router.delete('/:productId', deleteProduct);

router.get('/v1/list', getAvailableProducts);

module.exports = router;
