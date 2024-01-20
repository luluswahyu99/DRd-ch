const CustomerModel = require("../models/customer")


class CustomerCtrl {
    static async addCustomer(req, res) {
        try {
            const {name} = req.body
            const customer = await CustomerModel.addCustomer(name)

            res.status(201).json(customer)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static async getCustomer(req, res) {
        try {
            const customers = await CustomerModel.getCustomer()

            res.status(200).json(customers)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

module.exports = CustomerCtrl