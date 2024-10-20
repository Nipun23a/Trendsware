const express = require('express');
const router = express.Router();
const {getOrders,createOrders,updateOrders,deleteOrders,getOrderById} = require('../controllers/orderController')


router.get('/orders',getOrders);
router.get('/orders/:id',getOrderById);
router.post('/orders',createOrders);
router.put('/orders/:id',updateOrders);
router.delete('/orders/:id',deleteOrders);

module.exports = router;
