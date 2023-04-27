const QRCode = require('../models/QRCode')
const qrcode = require('qrcode');

// GET /qrcodes/:id
// Retreives data about a QRCode by its unique ID
const getQRCode = async (req, res) => {
  try {
    // const qrCode = await QRCode.findById(req.params.id)

    return res.json({
      success: true,
      message: 'QRCode Details retreived Successfully',
      // qrCode,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      errorMessage: 'Error retrieving QR code.',
      errorType: 'Internal Server Error',
    })
  }
}

// POST /qrcodes
// Creates a QRCode in database
const createQRCode = async (req, res) => {
  try {
    // const productName = 'Example Product'
    // const description = 'This is an example product.'
    // const imageUrl = 'https://example.com/image.jpg'

    const { productName, description, imageUrl } = req.body

    const qrCodeData = new QRCode({
      productName,
      description,
      imageUrl,
    })

    await qrCodeData.save()

    return res.json({
      success: true,
      message: 'QRCode Details Saved Successfully',
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      errorMessage: 'Error creating QR code.',
      errorType: 'Internal Server Error',
    })
  }
}

// PUT /qrcodes/:id
// Updates details about a QRCode by ID
const updateQRCode = async (req, res) => {
  try {
    const { productName, description, imageUrl } = req.body

    const qrCode = await QRCode.findById(req.params.id)

    if (productName) qrCode.productName = productName
    if (description) qrCode.description = description
    if (imageUrl) qrCode.imageUrl = imageUrl

    await qrCode.save()

    return res.json({
      success: true,
      message: 'QRCode Details updated Successfully',
      qrCode,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      errorMessage: 'Error updating QR code.',
      errorType: 'Internal Server Error',
    })
  }
}

// ------------------------------------- ADMIN ROUTE ----------------------------

// GET /qrcodes
// Retrives all the QRCodes saved in database
const getAllQRCode = async (req, res) => {
  try {
    const qrCodes = await QRCode.find({})

    return res.json({
      success: true,
      message: 'QRCode Details retreived Successfully',
      qrCodes,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      errorMessage: 'Error retrieving QR code.',
      errorType: 'Internal Server Error',
    })
  }
}

// PUT /qrcodes/:id
// Updates details about a QRCode by ID
const deleteQRCode = async (req, res) => {
  try {
    const qrCode = await QRCode.findByIdAndRemove(req.params.id)

    return res.json({
      success: true,
      message: 'QRCode deleted Successfully',
      qrCode,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      errorMessage: 'Error deleteing QR code.',
      errorType: 'Internal Server Error',
    })
  }
}

module.exports = {
  createQRCode,
  getQRCode,
  getAllQRCode,
  updateQRCode,
  deleteQRCode,
}
