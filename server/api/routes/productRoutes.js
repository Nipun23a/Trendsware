const express = require('express');
const router = express.Router();
const {getProducts,createProducts,updateProducts,deleteProducts, getProductById, deactivateProduct, activateProduct,
    getNewArrivals
} = require('../controllers/productController');

router.get('/new-arrivals',getNewArrivals);
router.get('/',getProducts);
router.get('/:id',getProductById);
router.post('/',createProducts);
router.put('/:id',updateProducts);
router.put('/:id/deactivate', deactivateProduct);
router.put('/:id/activate',activateProduct);
router.delete('/:id',deleteProducts);


module.exports = router;

