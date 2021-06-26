const {Router} = require('express')
const router = Router()
const controller = require('../controllers/profiles')
const authMiddlewares = require('../middlewares/auth')


router.post('/', authMiddlewares, controller.getAll)
router.get('/:id', authMiddlewares, controller.getProfileById)

module.exports = router