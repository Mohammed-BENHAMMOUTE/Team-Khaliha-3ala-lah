let resCode = require("http-codes")
let db = require("../models");
let createError = require("http-errors");


//message bus
const customerAddedMessage = require('../message-bus/send/customer.added');
const customerDeleteMessage = require('../message-bus/send/customer.deleted');

/* GET /ping (for testing) */
exports.pingPong = (req, res, next) => {
    res.status(resCode.OK).json({
        message: "pong"
    });
}

/* GET /api/customers/all (list all customers) */
exports.allCustomers = async (req, res, next) => {
    try {
        let customers = await db.Customer.findAll();
        res.status(resCode.OK).json(customers);
    } catch (err) {
        next(createError(createError.InternalServerError, "An unexpected error in our end while getting customers list"))
    }
}

/* POST /api/customers/add (add a customer) */
exports.addCustomer = async (req, res, next) => {
    try {
        let {
            name,
            address,
            email,
            city,
            postCode,
            number
        } = req.body;

        let customer = await db.Customer.create({
            name,
            address,
            city,
            postCode,
            email,
            number
        });

        if (customer) {
            //send customer to the message broker
            customerAddedMessage.send(customer);
            res.status(resCode.OK).send(`Customer ${name} has been added successfully`);
        }
    } catch (err) {
        next(err);
        //next(createError(createError.InternalServerError, "An unexpected error in our end while creating new customer"))
    }
}

/* DELETE /api/customers/:id (delete a customer) */
exports.deleteCustomer = async (req, res, next) => {
    try {
        let _id = req.params.id;
        let deleted = await db.Customer.destroy({
            where: {
                id: _id
            }
        });

        if(deleted == 1){
            customerDeleteMessage.send(_id)
            res.status(resCode.OK)
                .send(`Customer with id ${_id} has been deleted successfully`)
        }
    } catch (err) {
        next(createError(createError.InternalServerError, "An unexpected error in our end while getting customers list"))
    }
}