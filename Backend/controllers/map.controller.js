const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator')

module.exports.getCoordinates = async (req, res, next) => {

    const { address } = req.query;
    try {
        const coordinates = await mapService.getAddressCoordinates(address);
        res.status(200).json({ coordinates });
    }
    catch (err) {
        res.status(404).json({ message: 'co-ordinates not found', err });
    }
}


module.exports.getDistanceTime = async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { origin, destination } = req.query;

        const distanceTime = await mapService.getDistanceTime(origin, destination)

        res.status(200).json(distanceTime)

    } catch (err) {
        console.err(err)
        res.status(500).json({ message: "internal server error" })
    }

}

module.exports.getSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { input } = req.query;

        const suggestions = await mapService.getSuggestions(input);

        res.status(200).json({ suggestions })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'internal server error' })

    }
}