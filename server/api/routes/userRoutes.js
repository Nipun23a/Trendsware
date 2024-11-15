const express = require('express');
const router = express.Router();
const {getUsers,createUsers,getUserById,updateUsers,deleteUsers, deactivateUser, activateUser} = require('../controllers/userController');


router.get('/',getUsers);
router.get('/:id',getUserById);
router.post('/',createUsers);
router.put('/:id',updateUsers);
router.put('/:id/deactivate', deactivateUser);
router.put('/:id/activate',activateUser);
router.delete('/:id',deleteUsers);

module.exports = router;
