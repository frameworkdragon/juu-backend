require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const { user } = require('./routes/user')

const morgan = require('morgan')

const express = require('express')
const app = express()

app.use(morgan('dev'))

require('./startup/db')()
require('./startup/routes')(app)

app.get('/', (req, res) => {
  res.json({
    message: 'Hello Customer, Welcome to JUU India',
  })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log('App listening to port: ' + PORT)
})
