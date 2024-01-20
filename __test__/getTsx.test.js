const app = require('../app')
const request = require('supertest')
const pool = require('../config/connection')
const TransactionModel = require('../models/transaction')
const CustomerModel = require('../models/customer')

const tsx = {
    customer_id: 1,
    menu: 'Nasi Goreng',
    price: 15000,
    qty: 2,
    payment: 'cash'
}

beforeAll(async () => {
    await CustomerModel.addCustomer('Tono')
    await TransactionModel.addTransaction({
        customer_id: 1,
        menu: 'Nasi Goreng',
        price: 15000,
        qty: 2,
        payment: 'cash'
    })
})

describe('get transaction', () => {
    test('success get transaction', async () => {
        let { status, body } = await request(app)
            .get('/transactions')
        expect(status).toBe(200)
        expect(body).toBeInstanceOf(Array)
        expect(body[0]).toHaveProperty("id", expect.any(Number))
        expect(body[0]).toHaveProperty("customer_name", expect.any(String))
        expect(body[0]).toHaveProperty("menu", expect.any(String))
        expect(body[0]).toHaveProperty("price", expect.any(Number))
        expect(body[0]).toHaveProperty("qty", expect.any(Number))
        expect(body[0]).toHaveProperty("payment", expect.any(String))
        expect(body[0]).toHaveProperty("total", expect.any(Number))
    })
})

afterAll(async () => {
    await pool.query('truncate table "Transaction" restart identity cascade');
    await pool.query('truncate table "Customer" restart identity cascade');
})