const { Router } = require('express')
const router = Router()

const { isAuthenticated } = require('../middlewares/auth')

const {
  activeTag,
  clearTag,
  attachTagToUser,
  deleteAllTag,
} = require('../controller/tagController')

// Tag
router.route('/activeTag').get(activeTag)

router.route('/clearTag').get(clearTag)
router.route('/attach-tag').post(attachTagToUser)
router.route('/delete-tags').delete(deleteAllTag)

module.exports = router
