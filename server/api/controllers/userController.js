const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const Product = require("../models/productModel");

exports.getUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};


exports.createUsers = async (req, res) => {
    try {
        // Destructure all required fields from request body
        const { name, email, password, role, imageUrl } = req.body;

        // Validate required fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: 'All required fields (name, email, password, role) must be provided.'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Please provide a valid email address.'
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long.'
            });
        }

        // Check if user with email already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                message: 'A user with this email already exists.'
            });
        }

        // Validate role
        const validRoles = ['helper', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                message: 'Invalid role provided.'
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user instance
        const newUser = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: role,
            image_url: imageUrl || '' // Make imageUrl optional
        });

        // Save the user
        const savedUser = await newUser.save();

        // Remove password from response
        const userResponse = savedUser.toObject();
        delete userResponse.password;

        return res.status(201).json({
            message: 'User created successfully',
            user: userResponse
        });

    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
};

exports.updateUsers = async (req,res) => {
    try {
        const {id} = req.params;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(id,updates,{new:true,runValidators: true });

        if(!user){
            return res.status(404).json({message: 'User Not Found'});
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({message: 'Error updating user',error: error.message});
    }
};

exports.deleteUsers = async(req,res) => {
    try {
        const {id}  = req.params;
        const user = await User.findByIdAndDelete(id);

        if(!user) {
            return res.status(404).json({message:'User Not Found'});
        }

        res.json({message:'User Deleted Succefully'});
    } catch (error) {
        res.status(400).json({message: 'Error deleting user',error: error.message});
    }
};

exports.getUserById = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        if (!user){
            return res.status(404).json({message:'User Not Found'});
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({message:'Error fetching user', error:error.message});
    }
};

exports.deactivateUser = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(
            id,
            {is_active:false},
            {new:true}
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User deactivated successfully',
            data: user
        });

    } catch (error) {
        console.error('Error in deactivate User:', error);
        return res.status(500).json({
            success: false,
            message: 'Error deactivating user',
            error: error.message
        });
    }
};

exports.activateUser = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(
            id,
            {is_active:true},
            {new:true}
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User activated successfully',
            data: user
        });

    } catch (error) {
        console.error('Error in Activated User:', error);
        return res.status(500).json({
            success: false,
            message: 'Error activated user',
            error: error.message
        });
    }
};
