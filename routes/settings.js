const {Router} = require('express')
const router = Router()
const controller = require('../controllers/settings')
const authMiddlewares = require('../middlewares/auth')
const validateMiddlewares = require('../middlewares/validateSettings')


router.patch('/', authMiddlewares, validateMiddlewares, controller.update)

module.exports = router