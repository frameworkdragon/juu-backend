const { Router } = require('express')
const router = Router()

const { clearAllDB } = require('../controller/utilCOntroller')
const { isAuthenticated } = require('../middlewares/auth')

// User
router.get('/clear-all-db', clearAllDB)

module.exports = router
