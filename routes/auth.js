const {Router} = require('express')
const router = Router()
const controller = require('../controllers/auth')
const isVoidMiddlewares = require('../middlewares/isVoid')

router.post('/login', controller.login)
router.post('/register', isVoidMiddlewares, controller.register)
router.get('/user', controller.getUser)

module.exports = router