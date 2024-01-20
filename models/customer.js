const pool = require('../config/connection')

class Customer {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

class CustomerModel {
    static async addCustomer(name) {
        const query = `
            insert into "Customer" ("name")
            values ('${name}')
        `

        await pool.query(query)
        return {name: name}
    }

    static async getCustomer() {
        const query = `
            select * from "Customer"
            order by name asc
        `

        const {rows} = await pool.query(query)
        const customer = rows.map(el => {
            const {id, name} = el
            const temp = new Customer(id, name)
            return temp
        })

        return customer
    }
}

module.exports = CustomerModel