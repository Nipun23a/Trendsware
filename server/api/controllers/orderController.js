const Order = require('../models/orderModel');

const validateOrderStatus = (req, res, next) => {
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(req.body.status)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid order status'
        });
    }
    next();
};

exports.getOrders = async (req,res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

exports.createOrders = async (req,res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({message:'Error creating order',error: error.message});
    }
};

exports.updateOrders = async (req,res) => {
    try {
        const {id} = req.params;
        const updates = req.body;

        const order = await Order.findByIdAndUpdate(id,updates,{new:true,runValidators: true });

        if(!order){
            return res.status(404).json({message: 'Order Not Found'});
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({message: 'Error updating order',error: error.message});
    }
};

exports.deleteOrders = async(req,res) => {
    try {
        const {id}  = req.params;
        const order = await Order.findByIdAndDelete(id);

        if(!order) {
            return res.status(404).json({message:'Order Not Found'});
        }

        res.json({message:'Order Deleted Succefully'});
    } catch (error) {
        res.status(400).json({message: 'Error deleting order',error: error.message});
    }
};

exports.getOrderById = async (req,res) => {
    try {
        const {id} = req.params;
        const order = await Order.findById(id);

        if (!order){
            return res.status(404).json({message:'Order Not Found'});
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({message:'Error fetching order', error:error.message});
    }
};

// New status update function
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status before updating
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid order status'
            });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            {
                status,
                updatedAt: Date.now()
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order Not Found' });
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({
            message: 'Error updating order status',
            error: error.message
        });
    }
};

module.exports = exports;