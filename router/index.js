const Router = require('koa-router')
const router = new Router()
const user = require('./user')
const userinfo = require('./userinfo')
const upload = require('./upload')

// 登录注册
router.use(user.routes(), user.allowedMethods())
// 用户管理
router.use(userinfo.routes(), userinfo.allowedMethods())
// 文件上传
router.use(upload.routes(), upload.allowedMethods())

module.exports = router
