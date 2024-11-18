const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    product : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product',
            required : true
        },
        quantity : {
            type: Number,
            required : true,
            default : 1,
        }
    }],
    transactionCode : {
        type: String,
        required: true,
        unique : true
    },
    totalAmount : {
        type: Number,
        required: true
    },
    customer : {
        firstName:String,
        lastName:String,
        telephone:String,
    },
    shippingAddress : {
        addressLine1: String,
        addressLine2: String,
        city:String,
        state: String,
        postalCode:String,
        country:String
    },
    status : {
        type: String,
        enum : ['pending','completed','shipped','delivered','cancelled'],
        default : 'pending'
    },

    createdAt : {
        type: Date,
        default : Date.now
    }
},{
    timestamps : true
});

const Order = mongoose.model('Order',OrderSchema);
module.exports = Order;