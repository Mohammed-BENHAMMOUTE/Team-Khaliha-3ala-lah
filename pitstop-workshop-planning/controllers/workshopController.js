let resCode = require("http-codes")
let db = require("../models");
let createError = require("http-errors");
let moment = require("moment");
let sequelize = require("sequelize");
const { Op } = require('sequelize')


/* GET /ping (for testing) */
exports.pingPong = (req, res, next) => {
    res.status(resCode.OK).json({
        message: "pong"
    });
}

/* GET vehicles (get vehicles list ). */
exports.allVehicles = async (req, res, next) => {
    try {
        let vehicles = await db.Vehicle.findAll({
            attributes: ['license', 'brand', 'type'],
            include: [{
                model: db.Customer,
                attributes: ['id', 'name', 'email', 'number']
            }]
        });
        res.status(resCode.OK).json(vehicles);
    } catch (err) {
        next(createError(createError.InternalServerError, "An unexpected error in our end while getting vehicles list"))
    }
}

/* GET maintenance jobs for a specific day */
exports.allJobsDay = async (req, res, next) => {
    try {
        let date = req.params.date;
        let jobs = await db.MaintenanceJob.findAll({
            attributes: ['id', 'startTime','endTime','description', 'status', 'vehicle'],
            where: sequelize.where(sequelize.fn('date', sequelize.col('startTime')), '=', date)
            // include: [{
            //     model: db.Vehicle,
            //     attributes: ['license', 'brand','type','owner'],
            //     include: [{
            //         model: db.Customer,
            //         attributes: ['id', 'number','email'],
            //     }]
            // }],
        });
        res.status(resCode.OK).json(jobs);
    } catch (err) {
        next(err)
        next(createError(createError.InternalServerError, "An unexpected error in our end while getting jobs list"))
    }
}

/* GET all maintenance jobs */
exports.allJobs = async (req, res, next) => {
    try {
        let jobs = await db.MaintenanceJob.findAll({
            attributes: ['id', 'startTime','endTime','description', 'status', 'vehicle'],
        });
        res.status(resCode.OK).json(jobs);
    } catch (err) {
        next(createError(createError.InternalServerError, "An unexpected error in our end while getting jobs list"))
    }
}

/* GET maintenance job details  */
exports.jobDetails = async (req, res, next) => {
    try {
        let id = req.params.id;
        let details = await db.MaintenanceJob.findOne({
            where: {id},
            attributes: ['id', 'startTime','endTime', 'description', 'status', 'createdAt', 'updatedAt'],
            include: [{
                model: db.Vehicle,
                attributes: ['license', 'brand','type'],
                include: [{
                    model: db.Customer,
                    attributes: ['id', 'number','email', 'name'],
                }]
            }],
        });
        res.status(resCode.OK).json(details);
    }
    catch(err){
        next(createError(createError.InternalServerError, "An unexpected error in our end while getting job details"))
    }
}


/* POST schedule a maintenance job */
exports.scheduleJob = async (req, res, next) => {
    try {
        let {
            date,
            startTime,
            endTime,
            description,
            vehicle,
            status
        } = req.body;
        startTime = moment(date + ' ' + startTime + ':00', "YYYY-MM-DD HH:mm:ss");
        endTime = moment(date + ' ' + endTime + ':00', "YYYY-MM-DD HH:mm:ss");

        let maintenance = await db.MaintenanceJob.create({
            startTime,
            endTime,
            description,
            vehicle,
            status
        });
        if (maintenance) {
            res.status(resCode.OK).send(`Maintenance job of vehicle ${vehicle} has been scheduled successfully`);
        }

    } catch (err) {
        next(createError(createError.InternalServerError, "An unexpected error in our end while scheduling a maintenance job list"))
    }
}


/* DELETE delete a maintenance job  */
exports.deleteMaintenanceJob = async (req, res, next) => {
    try {
        let id = req.params.id;
        let deleted = await db.MaintenanceJob.destroy({
            where: {
                id
            }
        });

        if (deleted == 1) {
            res.status(resCode.OK)
                .send(`Maintenance job with license ${id} has been deleted successfully`)
        }
    } catch (err) {
        next(createError(createError.InternalServerError, "An unexpected error in our end while deleting a maintenance job"))
    }
};


/* PUT Complete a maintenance job  */
exports.completeJob = async (req, res, next) => {
    try {
        let id = req.params.id;
        let updated = await db.MaintenanceJob.update({ status: "completed"},{
            where: {
                id
            }
        });

        if (updated[0] == 1) {
            res.status(resCode.OK)
                .send(`Maintenance job with license ${id} has been completed successfully`)
        }
    } catch (err) {
        next(createError(createError.InternalServerError, "An unexpected error in our end while completing a maintenance job"))
    }
};