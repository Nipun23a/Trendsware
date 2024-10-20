const express = require('express');
const router = express.Router();
const {getUsers,createUsers,getUserById,updateUsers,deleteUsers} = require('../controllers/userController');

router.get('/',getUsers);
router.get('/:id',getUserById);
router.post('/',createUsers);
router.put('/:id',updateUsers);
router.delete('/:id',deleteUsers);

module.exports = router;
