const express = require('express')
const router = express.Router()

const {
  getStripeKeys,
  createPaymentIntent,
  savePaymentDetails,
  handlePaymentSucceed,
} = require('../controller/paymentController')

router.route('/create-checkout-session').post(createPaymentIntent)
router.route('/save-payment-details').post(savePaymentDetails)
router.route('/webhook', express.raw({type: 'application/json'})).post(handlePaymentSucceed)
router.route('/stripe-keys').get(getStripeKeys)

module.exports = router
