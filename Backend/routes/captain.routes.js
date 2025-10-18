const express = require('express');
const router = express.Router();
const { body } = require("express-validator")

const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),

    body('fullname.firstname').
        isLength({ min: 3 }).withMessage('first name must be at least 3 character long'),

    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 character long'),

    body('vehicle.color').isLength({ min: 3 }).withMessage('color must be at least 3 character long'),

    body('vehicle.plate').isLength({ min: 3 }).withMessage('plate must be at least 3 character long'),

    body('vehicle.capacity').isInt({ min: 1 }).withMessage('capacity must be at least 1'),

    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('invalid vehicle type'),
], captainController.registerCaptain);



router.post('/login', [
    body('email').isEmail().withMessage("please enter a valid email"),
    body('password').isLength({ min: 6 }).withMessage("password must be atleast 6 character long")
],
    captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)


module.exports = router;
