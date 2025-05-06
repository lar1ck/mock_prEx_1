const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.post('/login', userController.login);
router.post('/register', userController.signup);

module.exports = router;
