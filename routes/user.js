const { Router } = require('express')
const router = Router()

const {
  login,
  register,
  getUser,
  editUser,
} = require('../controller/userController')
const { isAuthenticated } = require('../middlewares/auth')

// User
router.post('/register', register)
router.post('/login', login)
router
  .route('/:id')
  .get(isAuthenticated, getUser)
  .patch(isAuthenticated, editUser)

module.exports = router
