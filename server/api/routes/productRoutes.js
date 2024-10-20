const express = require('express');
const router = express.Router();
const {getProducts,createProducts,updateProducts,deleteProducts, getProductById} = require('../controllers/productController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.get('/products',getProducts);
router.get('/products/:id',getProductById);
router.post('/products',authMiddleware,createProducts);
router.put('products/:id',authMiddleware,updateProducts);
router.delete('products/:id',authMiddleware,deleteProducts);