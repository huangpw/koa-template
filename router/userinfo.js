const Router = require('koa-router')
const userInfoRouter = Router()
const { isAdmin } = require('../utils/auth')

userInfoRouter.put('/user/update', isAdmin, async (ctx) => {
  ctx.body = '用户修改'
})

userInfoRouter.get('/user/get', async (ctx) => {
  ctx.body = '2222'
})

userInfoRouter.get('/blog/user/get', async (ctx) => {
  ctx.body = '3333'
})

module.exports = userInfoRouter
