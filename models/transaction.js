const pool = require('../config/connection')

class Transaction {
    constructor(id, customer_name, menu, price, qty, payment, total, created_at) {
        this.id = id
        this.customer_name = customer_name
        this.menu = menu
        this.price = price
        this.qty = qty
        this.payment = payment
        this.total = total
        this.created_at = created_at
    }
}

class TransactionModel {
    static async addTransaction({customer_id, menu, price, qty, payment}) {
        const query = `
            insert into "Transaction" ("customer_id", "menu", "price", "qty", "payment", "total", "created_at")
            values ($1, $2, $3, $4, $5, $6, $7)
        `
        const total = price * qty
        const created_at = new Date().toISOString()
        const values = [customer_id, menu, price, qty, payment, total, created_at]

        await pool.query(query, values)
        return {customer_id, menu, price, qty, payment, total, created_at}
    }

    static async getTransaction({menu, price}) {
        const query = `
            select t.id, c.name, t.menu, t.price, t.qty, t.payment, t.total, t.created_at from "Transaction" t
            join "Customer" c on c.id = t.customer_id
            where t.menu ilike $1 ${price ? 'and t.price = $2' : ''}  
            order by t.created_at desc, c.name 
        `

        const values = price ? [`%${menu}%`, price] : [`%${menu}%`]
        const {rows} = await pool.query(query, values)
        const tsx = rows.map( el => {
            const {id, name, menu, price, qty, payment, total, created_at} = el
            const temp = new Transaction(id, name, menu, price, qty, payment, total, created_at)
            return temp
        })

        return tsx
    }
}

module.exports = TransactionModel