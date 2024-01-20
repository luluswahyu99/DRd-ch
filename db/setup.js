const pool = require('../config/connection')

const customer = `
    create table if not exists "Customer" (
        "id" serial primary key,
        "name" varchar(50) not null
    )
`

const trancsaction= `
    create table if not exists "Transaction" (
        "id" serial primary key,
        "customer_id" integer not null references "Customer"("id"),
        "menu" varchar(30) not null,
        "price" integer not null,
        "qty" integer not null default 1,
        "payment" varchar(20) null,
        "total" integer not null,
        "created_at" date default current_date
    )
`

const drop = `drop table if exists "Customer", "Transaction"`

pool.query(drop, (err) => {
    if (err) {
        console.log(err.message)
    } else {
        pool.query(customer, (err) => {
            if (err) {
                console.log(err.message)    
            } else {
                console.log('customer table crated')
                pool.query(trancsaction, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('transaction table created')
                    }
                })
            }
        })
    }
})