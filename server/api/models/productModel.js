const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{type:String,required: true},
    productSKU:{type:String,required: true},
    description : {type:String,required:true},
    quantity:{type:Number,required:true},
    getPrice:{type:Number,required:true},
    sellPrice:{type:Number,required:true},
    imageUrl : {type:String, required: true},
    is_active:{type:Boolean, default: true},
}, {timestamps:true});

module.exports = mongoose.model('Product', productSchema);