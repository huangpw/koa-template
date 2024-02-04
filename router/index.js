const Router = require('koa-router')
const router = new Router()
const user = require('./user')
const userinfo = require('./userinfo')
const upload = require('./upload')
const email = require('./email')
const smsRouter = require('./sms')

// 登录注册
router.use(user.routes(), user.allowedMethods())
// 用户管理
router.use(userinfo.routes(), userinfo.allowedMethods())
// 文件上传
router.use(upload.routes(), upload.allowedMethods())
// 邮件发送
router.use(email.routes(), email.allowedMethods())
// 获取验证码
router.use(smsRouter.routes(), smsRouter.allowedMethods())

module.exports = router
