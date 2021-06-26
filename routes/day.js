const {Router} = require('express')
const router = Router()
const controller = require('../controllers/day')
const authMiddlewares = require('../middlewares/auth')
const dayMiddlewares = require('../middlewares/day')
const dayEndMiddlewares = require('../middlewares/dayEnd')


router.get('/', authMiddlewares, dayMiddlewares, controller.getAll)
router.post('/', authMiddlewares, dayEndMiddlewares, dayMiddlewares, controller.create)
router.patch('/:id', authMiddlewares, dayEndMiddlewares, dayMiddlewares, controller.update)
router.patch('/', authMiddlewares, dayMiddlewares, controller.updateAll)

module.exports = router