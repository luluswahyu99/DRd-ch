const express = require('express')
const router = require('./route')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(router)

module.exports = app