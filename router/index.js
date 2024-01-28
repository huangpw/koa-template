const Router = require('koa-router')
const router = new Router()
const user = require('./user')
const userinfo = require('./userinfo')

// 登录注册
router.use(user.routes(), user.allowedMethods())
// 用户管理
router.use(userinfo.routes(), userinfo.allowedMethods())

module.exports = router
