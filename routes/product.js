const { Router } = require('express')
const router = Router()

const {
  getProductData,
  uploadData,
  createSingleProduct,
} = require('../controller/productController')

const multer = require('multer')
const upload = multer({ dest: './temp/data/uploads/' })

router.route('/get-product').get(getProductData)
router.route('/create-single-product').post(createSingleProduct)
router.route('/upload-mutiple-product').post(upload.single('file'), uploadData)

module.exports = router
