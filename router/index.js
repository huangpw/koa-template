const Router = require('koa-router')
const router = new Router()
const userRouter = require('./user')
const userInfoRouter = require('./userinfo')

// 登录注册
router.use(userRouter.routes(), userRouter.allowedMethods())
// 用户管理
router.use(userInfoRouter.routes(), userInfoRouter.allowedMethods())

module.exports = router
