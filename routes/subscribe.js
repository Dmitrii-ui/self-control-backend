const {Router} = require('express')
const router = Router()
const controller = require('../controllers/subscribe')
const authMiddlewares = require('../middlewares/auth')


router.get('/', authMiddlewares, controller.getAll)
router.post('/', authMiddlewares, controller.subscribe)
router.delete('/:id', authMiddlewares, controller.unsubscribe)

module.exports = router