const express = require('express')
const router = require('./route')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(router)

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})