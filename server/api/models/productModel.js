const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{type:String,required: true},
    description : {type:String,required:true},
    price : {type: Number, required: true},
    imageURL : {type:String, required: true},
    category : {type: String, required: true},
    gender : {type: String, enum: ['male','female','unisex'], required: true},

}, {timestamps:true});

module.exports = mongoose.model('Product', productSchema);