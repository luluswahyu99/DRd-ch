const TransactionModel = require("../models/transaction")


class TransactionCtrl {
    static async addTransaction(req, res, next) {
        try {
            const {customer_id, menu, price, qty, payment} = req.body
            if (!customer_id) {
                throw {name: 'BadRequest', message: 'Please select customer'}
            }
            if (!customer_id) {
                throw {name: 'BadRequest', message: 'Menu is required'}
            }
            if (!customer_id) {
                throw {name: 'BadRequest', message: 'Price is required'}
            }
            if (!customer_id) {
                throw {name: 'BadRequest', message: 'Qty is required'}
            }
            if (!customer_id) {
                throw {name: 'BadRequest', message: 'Payment is required'}
            }
            const tsx = await TransactionModel.addTransaction({customer_id, menu, price, qty, payment})

            res.status(201).json(tsx)
        } catch (error) {
            next(error)
        }
    }

    static async getTransaction(req, res, next) {
        try {
            const dataTsx = {
                menu : req.query.menu ? req.query.menu : '',
                price : req.query.price ? req.query.price : null
            }
            const tsx = await TransactionModel.getTransaction(dataTsx)

            if (tsx.length > 0) {
                res.status(200).json(tsx)
            } else {
                throw {name: 'NotFound', message: 'Transaction not found'}
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TransactionCtrl