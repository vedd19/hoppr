const captainModel = require('../models/captain.model')

module.exports.createCaptain = async ({ firstname, lastname, email, password, color, plate, capacity, vehicleType }) => {
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            capacity,
            color,
            plate,
            vehicleType
        }
    })

    return captain;
}