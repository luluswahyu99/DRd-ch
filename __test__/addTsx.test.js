const app = require('../app')
const request = require('supertest')
const pool = require('../config/connection')
const CustomerModel = require('../models/customer')

const tsx = {
    customer_id: 1,
    menu: 'Nasi Goreng',
    price: 15000,
    qty: 2,
    payment: 'cash'
}

beforeAll( async () => {
    await CustomerModel.addCustomer('Tono')
})

describe('add transaction', () => {
    test('success add transaction', async () => {
        let { status, body } = await request(app)
            .post('/transaction/add')
            .send(tsx)
        console.log(status, body, tsx)
        expect(status).toBe(201)
    })
})

afterAll(async () => {
    await pool.query('truncate table "Transaction" restart identity cascade');
    await pool.query('truncate table "Customer" restart identity cascade');
})