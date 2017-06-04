const controller = require('../controllers/users.controller')
const Router = require('koa-router')

const router = new Router()
const baseUrl = '/users/'

router.get(baseUrl, controller.getUsers)
router.get(`${baseUrl}:id`, controller.getUser)

router.post(`/user/create`, controller.createUser)
router.put(`${baseUrl}:id`, controller.updateUser)
router.del(`${baseUrl}:id`, controller.deleteUser)

module.exports = router
