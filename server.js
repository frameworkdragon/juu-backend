require('dotenv').config()

// const morgan = require('morgan')
const cors = require('cors')

const express = require('express')
const app = express()

// if (process.env.NODE_ENV !== 'production') {
//   app.use(morgan('dev'))
// }

app.use(cors())
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
