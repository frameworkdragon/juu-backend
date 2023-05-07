const { Router } = require('express')
const router = Router()

const {
  getProductData,
  uploadData,
} = require('../controller/productController')

const multer = require('multer')
const upload = multer({ dest: './temp/data/uploads/' })

router.route('/getProduct').get(getProductData)
router.route('/upload').post(upload.single('file'), uploadData)

module.exports = router
