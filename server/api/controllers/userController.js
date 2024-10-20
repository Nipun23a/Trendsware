const User = require('../models/userModel');

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
        const {first_name, last_name, email, password, user_role} = req.body;
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                message: 'All required fields (first_name, last_name, email, password) must be provided.',
            });
        }
        const newUser = new User({
            first_name,
            last_name,
            email,
            password,
            user_role,
        });
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(400).json({
            message: 'Error creating user',
            error: error.message,
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