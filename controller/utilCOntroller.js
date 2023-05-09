const Cart = require('../models/Cart')
const Customer = require('../models/Customer')
const Tag = require('../models/Tag')
const Product = require('../models/Product')
const QRCode = require('../models/QRCode')

const clearAllDB = async (req, res) => {
  try {
    await Cart.deleteMany({})
    await Customer.deleteMany({})
    await Tag.deleteMany({})
    await Product.deleteMany({})
    await QRCode.deleteMany({})

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: { message: error, type: 'Internal Server Error' },
    })
  }
}

module.exports = { clearAllDB }
