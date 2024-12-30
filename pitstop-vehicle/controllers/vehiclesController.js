let resCode = require("http-codes")
let db = require("../models");
let createError = require("http-errors");

//message bus
const vehicleAddedMessage = require('../message-bus/send/vehicle.added');

/* GET /ping (for testing) */
exports.pingPong = (req, res, next) => {
    res.status(resCode.OK).json({
        message: "pong"
    });
}

/* GET customers (get customers list ). */
exports.allCustomers = async (req, res, next) => {
    try {
        let customers = await db.Customer.findAll();
        res.status(resCode.OK).json(customers);
    } catch (err) {
        next(createError(createError.InternalServerError, "An unexpected error in our end while getting customers list"))
    }
}

/* GET /api/vehicles/all (list all registered vehicles) */
exports.allVehicles = async (req, res, next) => {
    try {
        let vehicles = await db.Vehicle.findAll({
            include: [{
                model: db.Customer
            }]
        });
        if (vehicles) {
            res.status(resCode.OK)
                .json(vehicles)
        }
    }
    catch (err) {
        next(err)
        //next(createError(createError.InternalServerError, "An unexpected error in our end while getting registered vehicles list"))
    }
}

/* POST /api/vehicles/add (register a vehicle) */
exports.registerVehicle = async (req, res, next) => {
    try {
        let {
            license,
            brand,
            type,
            owner
        } = req.body;

        let vehicle = await db.Vehicle.create({
            license,
            brand,
            type,
            owner
        });

        if (vehicle) {
            //send vehicle to the message broker
            vehicleAddedMessage.send(vehicle.dataValues);
            res.status(resCode.OK).send(`Vehicle ${license} has been added successfully`);
        }
    }
    catch (err) {
        next(createError(createError.InternalServerError, "An unexpected error in our end while registering a new vehicle"))
    }
}

/* DELETE /api/vehicles/:license (delete a vehicle) */
exports.deleteVehicle = async (req, res, next) => {
    try {
        let license = req.params.license;
        let deleted = await db.Vehicle.destroy({
            where: {
                license: license
            }
        });

        if (deleted == 1) {
            res.status(resCode.OK)
                .send(`Vehicle with license ${license} has been deleted successfully`)
        }
    } catch (err) {
        next(createError(createError.InternalServerError, "An unexpected error in our end while getting customers list"))
    }
};