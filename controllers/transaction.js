const TransactionModel = require("../models/transaction")


class TransactionCtrl {
    static async addTransaction(req, res, next) {
        try {
            const data = req.body
            const tsx = await TransactionModel.addTransaction(data)

            res.status(201).json(tsx)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static async getTransaction(req, res, next) {
        try {
            const dataTsx = {
                menu : req.query.menu ? req.query.menu : '',
                price : req.query.price ? req.query.price : null
            }
            const tsx = await TransactionModel.getTransaction(dataTsx)
            res.status(200).json(tsx)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: error.message})
        }
    }
}

module.exports = TransactionCtrl