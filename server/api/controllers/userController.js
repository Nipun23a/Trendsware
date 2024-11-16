const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

        // Create new user instance - password will be hashed by the pre-save middleware
        const newUser = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password, // Don't hash here - let the middleware do it
            role: role,
            image_url: imageUrl || ''
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

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are Required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                message: 'User not found. Please check your email.',
            });
        }

        if (!user.is_active) {
            return res.status(403).json({
                message: 'Your account is inactive. Contact support for assistance.',
            });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password. Please try again.',
            });
        }

        // Make sure to use process.env.JWT_SECRET
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                image_url: user.image_url,
            },
        });
    } catch (error) {
        console.error('Error During login:', error);
        return res.status(500).json({
            message: "Error During Login",
            error: error.message,
        });
    }
};
