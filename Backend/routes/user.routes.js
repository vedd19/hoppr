
const express = require('express')
const router = express.Router();
const { body } = require('express-validator')
const userController = require('../controllers/user.controller')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('first name must be atleast 3 character long'),
    body('password').isLength({ min: 6 }).withMessage('password must be atleast 6 character long')
],
    userController.registerUser)



module.exports = router;