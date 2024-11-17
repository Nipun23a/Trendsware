const express = require('express');
const router = express.Router();
const {getOrders,createOrders,updateOrders,deleteOrders,getOrderById, updateOrderStatus} = require('../controllers/orderController')

router.patch('/:id/status', updateOrderStatus);
router.get('/',getOrders);
router.get('/:id',getOrderById);
router.post('/',createOrders);
router.put('/:id',updateOrders);
router.delete('/:id',deleteOrders);

module.exports = router;
