const Product = require('../models/productModel');

exports.getProducts = async (req,res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};


exports.createProducts = async (req, res) => {
    try {
        // Log the incoming request body
        console.log('Received product data:', req.body);

        // Validate the incoming data
        const { productName, productSKU, description, getPrice, sellPrice, imageUrl,quantity } = req.body;

        if (!productName || !productSKU || !description || !getPrice || !sellPrice || !imageUrl || !quantity) {
            console.log('Missing required fields:', {
                productName: !!productName,
                productSKU: !!productSKU,
                description: !!description,
                getPrice: !!getPrice,
                sellPrice: !!sellPrice,
                imageUrl: !!imageUrl,
                quantity: !!quantity,
            });
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create new product with validated data
        const newProduct = new Product({
            productName,
            productSKU,
            description,
            quantity:Number(quantity),
            getPrice: Number(getPrice),
            sellPrice: Number(sellPrice),
            imageUrl
        });

        // Save the product
        const savedProduct = await newProduct.save();
        console.log('Product saved successfully:', savedProduct);

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error in createProducts:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        res.status(400).json({
            message: 'Error creating product',
            error: error.message,
            details: error.errors // Mongoose validation errors
        });
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

exports.getProductById = async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);

        if (!product){
            return res.status(404).json({message:'Product Not Found'});
        }

        res.json(product);
    } catch (error) {
        res.status(400).json({message:'Error fetching product', error:error.message});
    }
};

exports.deactivateProduct = async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(
            id,
            {is_active:false},
            {new:true}
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product deactivated successfully',
            data: product
        });

    } catch (error) {
        console.error('Error in deactivateProduct:', error);
        return res.status(500).json({
            success: false,
            message: 'Error deactivating product',
            error: error.message
        });
    }
};

exports.activateProduct = async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(
            id,
            {is_active:true},
            {new:true}
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product activated successfully',
            data: product
        });

    } catch (error) {
        console.error('Error in Activated Product:', error);
        return res.status(500).json({
            success: false,
            message: 'Error activated product',
            error: error.message
        });
    }
};

