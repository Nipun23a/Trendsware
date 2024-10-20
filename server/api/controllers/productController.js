const Product = require('../models/productModel');

exports.getProducts = async (req,res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};


exports.createProducts = async (req,res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({message:'Error creating product',error: error.message});
    }
};

exports.updateProducts = async (req,res) => {
    try {
        const {id} = req.params;
        const updates = req.body;

        const product = await Product.findByIdAndUpdate(id,updates,{new:true,runValidators: true });

        if(!product){
            return res.status(404).json({message: 'Product Not Found'});
        }

        res.json(product);
    } catch (error) {
        res.status(400).json({message: 'Error updating product',error: error.message});
    }
};

exports.deleteProducts = async(req,res) => {
    try {
        const {id}  = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product) {
            return res.status(404).json({message:'Product Not Found'});
        }

        res.json({message:'Product Deleted Succefully'});
    } catch (error) {
        res.status(400).json({message: 'Error deleting product',error: error.message});
    }
};