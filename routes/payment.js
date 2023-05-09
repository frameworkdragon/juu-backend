const { Router } = require('express')
const router = Router()

const {
  getPaymentIntent,
  savePaymentDetails,
} = require('../controller/paymentController')

router.route('/create-checkout-session').post(getPaymentIntent)
router.route('/save-payment-details').post(savePaymentDetails)

module.exports = router
