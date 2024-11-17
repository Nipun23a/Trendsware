const express = require('express');
const router = express.Router();
const {getUsers,createUsers,getUserById,updateUsers,deleteUsers, deactivateUser, activateUser, login, updateProfile} = require('../controllers/userController');
const {authMiddleware} = require("../middleware/authMiddleware");


router.get('/',getUsers);
router.put('/profile', updateProfile);
router.get('/:id',getUserById);
router.post('/',createUsers);
router.put('/:id',updateUsers);
router.put('/:id/deactivate', deactivateUser);
router.put('/:id/activate',activateUser);
router.delete('/:id',deleteUsers);
router.post('/login',login);

module.exports = router;
