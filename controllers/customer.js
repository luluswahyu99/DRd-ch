const CustomerModel = require("../models/customer")


class CustomerCtrl {
    static async addCustomer(req, res, next) {
        try {
            const {name} = req.body
            const customer = await CustomerModel.addCustomer(name)

            res.status(201).json(customer)
        } catch (error) {
            next(error)
        }
    }

    static async getCustomer(req, res, next) {
        try {
            const customers = await CustomerModel.getCustomer()

            res.status(200).json(customers)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CustomerCtrl