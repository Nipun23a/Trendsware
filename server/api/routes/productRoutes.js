const express = require('express');
const router = express.Router();
const {getProducts,createProducts,updateProducts,deleteProducts, getProductById} = require('../controllers/productController');


router.get('/products',getProducts);
router.get('/products/:id',getProductById);
router.post('/products',createProducts);
router.put('products/:id',updateProducts);
router.delete('products/:id',deleteProducts);


module.exports = router;

