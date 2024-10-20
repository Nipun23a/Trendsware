const express = require('express');
const router = express.Router();
const {getUsers,createUsers,getUserById,updateUsers,deleteUsers} = require('../controllers/userController');

router.get('/users',getUsers);
router.get('/users/:id',getUserById);
router.post('/users',createUsers);
router.put('/users/:id',updateUsers);
router.delete('/users/:id',deleteUsers);

module.exports = router;
