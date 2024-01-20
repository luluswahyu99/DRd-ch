const CustomerCtrl = require('../controllers/customer')
const TransactionCtrl = require('../controllers/transaction')

const router = require('express').Router()

router.post('/customer/add', CustomerCtrl.addCustomer)
router.get('/customers', CustomerCtrl.getCustomer)

router.post('/transaction/add', TransactionCtrl.addTransaction)
router.get('/transactions', TransactionCtrl.getTransaction)

module.exports = router