const CustomerCtrl = require('../controllers/customer')
const TransactionCtrl = require('../controllers/transaction')
const errorHandler = require('../middlewares/errorHandler')

const router = require('express').Router()

router.post('/customer/add', CustomerCtrl.addCustomer)
router.get('/customers', CustomerCtrl.getCustomer)

router.post('/transaction/add', TransactionCtrl.addTransaction)
router.get('/transactions', TransactionCtrl.getTransaction)

router.use(errorHandler)

module.exports = router