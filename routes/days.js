const {Router} = require('express')
const router = Router()
const controller = require('../controllers/days')
const authMiddlewares = require('../middlewares/auth')


router.get('/:id', authMiddlewares, controller.getDayById)
router.post('/', authMiddlewares, controller.getAll)

module.exports = router