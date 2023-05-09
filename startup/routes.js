const bodyParser = require('body-parser')
const cors = require('cors')
const qrCodeRouter = require('../routes/qrCode')
const userRouter = require('../routes/user')
const tagRouter = require('../routes/tag')
const productRouter = require('../routes/product')
const cartRouter = require('../routes/cart')
const paymentRouter = require('../routes/payment')

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.json())

  app.use('/api/qrcodes', qrCodeRouter)
  app.use('/api/user', userRouter)
  app.use('/api/tag', tagRouter)
  app.use('/api/product', productRouter)
  app.use('/api/cart', cartRouter)
  app.use('/api/payment', paymentRouter)

  //app.use("/api/video", video);
  //app.post('/addToCart', productController.addProductToUserCart);
  app.use('/api/test', (req, res) =>
    res.status(200).json({ success: false, message: 'test' })
  )
  // If no routes match
  app.use('*', (req, res) =>
    res.status(404).json({ success: false, message: 'Route  does not exist' })
  )
}
