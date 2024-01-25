const jwt = require('jsonwebtoken')
const config = require('./config')
/**
 * 判断是否管理员
 * @param {*} ctx
 * @param {*} next
 */
exports.isAdmin = async (ctx, next) => {
  const token = ctx.header.authorization.replace('Bearer ', '')
  //   console.log(token)
  const user = jwt.decode(token, config.jwtSecretKey)
  //   console.log(user, 'user')
  ctx.request.user = user
  console.log(user, 'user')
  await next()
  //   const is_admin = req.auth.is_admin
  //   if (!is_admin) {
  //     return res.new_send('非管理员，暂无操作权限！')
  //   } else {
  //     next()
  //   }
}

/**
 * 读取token中的user
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
exports.getTokenToUser = async (ctx, next) => {
  const token = ctx.header.authorization.replace('Bearer ', '')
  const user = jwt.decode(token, config.jwtSecretKey)
  ctx.request.user = user
  await next()
}
