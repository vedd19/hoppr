const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/map.controller')
const { query } = require('express-validator')


router.get('/get-coordinates', authMiddleware.authUser, mapController.getCoordinates);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistanceTime
)

router.get('/get-suggestions', query('input').isLength({ min: 1 }), authMiddleware.authUser, mapController.getSuggestions)

module.exports = router;