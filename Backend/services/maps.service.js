const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinates = async (address) => {

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status == 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng
            }

        }
        else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (err) {
        console.error('error', err)
    }

}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and Destination are required')
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;



    try {
        const response = await axios.get(url);
        if (response.status = "OK") {

            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('no results found')
            }
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {

        console.error(err)

    }
}

module.exports.getSuggestions = async (input) => {
    if (!input) {
        throw new Error('input is required')
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            // console.log("not ")
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getCaptainsInTheRadius = async (latitude, longitude, radius) => {

    const captains = await captainModel.find(
        {
            location: {
                $geoWithin: {
                    $centerSphere: [[latitude, longitude], radius / 6371]
                }
            }
        }
    );
    return captains;
}