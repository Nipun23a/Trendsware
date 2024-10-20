const express = require('express');
const router = express.Router();
const {getProducts,createProducts,updateProducts,deleteProducts, getProductById} = require('../controllers/productController');


router.get('/',getProducts);
router.get('/:id',getProductById);
router.post('/',createProducts);
router.put('/:id',updateProducts);
router.delete('/:id',deleteProducts);


module.exports = router;

