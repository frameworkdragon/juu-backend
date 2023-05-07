const QRCode = require('../models/QRCode');
const Tag = require('../models/Tag');
const Cart = require('../models/Cart');

// GET /qrcodes/:id
// Retreives data about a QRCode by its unique ID
const getQRCode = async (req, res) => {
  try {
    const qrCode = await QRCode.findOne({ qrCodeID: req.params.id });

    return res.json({
      success: true,
      message: 'QRCode Details retreived Successfully',
      qrCode,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      errorMessage: 'Error retrieving QR code.',
      errorType: 'Internal Server Error',
    });
  }
};

// POST /qrcodes
// Creates a QRCode in database
const createQRCode = async (req, res) => {
  try {
    const { tagID, qrCodeID } = req.body;

    const qrCode = await QRCode.create({ qrCodeID });
    const cart = new Cart();
    const tag = await Tag.create({
      qrCode: qrCode._id,
      tagID,
      cart: cart._id,
    });

    cart.tag = tag._id;
    await cart.save();

    return res.json({
      qrCode,
      tag,
      success: true,
      message: 'QRCode Details Saved Successfully',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      errorMessage: 'Error creating QR code.',
      errorType: 'Internal Server Error',
    });
  }
};

// PUT /qrcodes/:id
// Updates details about a QRCode by ID
// Attches the tagID with new qrCodeID
const updateQRCode = async (req, res) => {
  try {
    const { tagID, qrCodeID } = req.body;

    const qrCode = await QRCode.create({ qrCodeID });
    const tag = await Tag.findOneAndUpdate({ tagID }, { qrCode: qrCode._id });

    return res.json({
      success: true,
      message: 'QRCode Details updated Successfully',
      qrCode,
      tag,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      errorMessage: 'Error updating QR code.',
      errorType: 'Internal Server Error',
    });
  }
};

// ------------------------------------- ADMIN ROUTE ----------------------------

// GET /qrcodes
// Retrives all the QRCodes saved in database
const getAllQRCode = async (req, res) => {
  try {
    const qrCodes = await QRCode.find({});

    return res.json({
      success: true,
      message: 'QRCode Details retreived Successfully',
      qrCodes,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      errorMessage: 'Error retrieving QR code.',
      errorType: 'Internal Server Error',
    });
  }
};

// DELETE /qrcodes/:id
// Deletes a QRCode by ID
const deleteQRCode = async (req, res) => {
  try {
    const qrCode = await QRCode.findOneAndDelete({ qrCodeID: req.params.id });

    return res.json({
      success: true,
      message: 'QRCode deleted Successfully',
      qrCode,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      errorMessage: 'Error deleteing QR code.',
      errorType: 'Internal Server Error',
    });
  }
};

module.exports = {
  createQRCode,
  getQRCode,
  getAllQRCode,
  updateQRCode,
  deleteQRCode,
};
