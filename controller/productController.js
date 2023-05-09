const Product = require('../models/Product')
const csvtojson = require('csvtojson')
const User = require('../models/Customer')

const uploadData = async (req, res) => {
  console.log(req.file)

  csvtojson()
    .fromFile(req.file.path)
    .then(async (csvData) => {
      try {
        await Product.deleteMany({})
        await Product.insertMany(csvData).then(() => {
          return res.json({
            success: true,
            message: 'Data updated',
          })
        })
      } catch (err) {
        return res.status(500).json({
          success: false,
          error: { message: err, type: 'Internal Server Error' },
        })
      }
    })
}

const getProductData = async (req, res) => {
  const { productID } = req.query

  try {
    const product = await Product.findOne({ productID })

    if (!product) {
      return res.status(400).json({
        success: false,
        errorMessage: 'Product Not Found',
        errorType: 'Product Not Found',
      })
    }

    return res.status(200).json({
      success: true,
      product,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: { message: err, type: 'Internal Server Error' },
    })
  }
}

const createSingleProduct = async (req, res) => {
  try {
    const { name, price, availableQty, productID } = req.body
    const product = await Product.create({
      name,
      price,
      availableQty,
      productID,
    })

    return res.status(200).json({
      success: true,
      product,
      message: 'Product created successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: { message: err, type: 'Internal Server Error' },
    })
  }
}

module.exports = { uploadData, getProductData, createSingleProduct }
