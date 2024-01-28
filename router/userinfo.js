const Router = require('koa-router')
const userinfo = Router()
const { isAdmin } = require('../utils/auth')

userinfo.put('/user/update', isAdmin, async (ctx) => {
  console.log(ctx.request.body)
  ctx.body = '用户修改'
})

userinfo.get('/user/get', async (ctx) => {
  ctx.body = '2222'
})

userinfo.get('/blog/user/get', async (ctx) => {
  ctx.body = '3333'
})

module.exports = userinfo
