const {Pool} = require('pg')

let database = 'DRd'

if (process.env.NODE_ENV === 'test') {
    database = 'DRd-test'
}

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: database,
    password: 'postgre',
    port: 5432,
    idleTimeoutMillis: 100
})

pool.connect()
    .then(client => {
        console.log('Connected to the database');
        client.release()
    })
    .catch(err => {
        console.error('Error connecting to the database', err);
    });

module.exports = pool