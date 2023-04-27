require('dotenv').config()
const { Router } = require('express')
const router = Router()

const {
  getQRCode,
  getAllQRCode,
  createQRCode,
  updateQRCode,
  deleteQRCode,
} = require('../controller/qrCodeController')

router.route('/').get(getAllQRCode).post(createQRCode)
router.route('/:id').get(getQRCode).put(updateQRCode).delete(deleteQRCode)

module.exports = router
