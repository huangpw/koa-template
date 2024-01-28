const db = require('../utils/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { send, getNowTime, formatTime } = require('../utils')
const config = require('../utils/config')

/**
 * 用户注册
 */
exports.register = async (ctx) => {
  const { username, email, mobile, password, password_verify, sex = 1, user_role = 'Ordinary' } = ctx.request.body
  if (!username || !email || !mobile || !password || !password_verify) {
    !username && (ctx.body = send('请输入用户名'))
    !email && (ctx.body = send('请输入邮箱地址'))
    !mobile && (ctx.body = send('请输入手机号码'))
    !password && (ctx.body = send('请输入密码'))
    !password_verify && (ctx.body = send('请输入确认密码'))
    return
  }
  if (password !== password_verify) {
    return (ctx.body = send('两次输入的密码不一致'))
  }
  // 注册处理
  const ctxBody = await new Promise((resolve, reject) => {
    const selectSql = `select * from b_user where username = ?`
    return db.query(selectSql, username, (err, result) => {
      if (err) return resolve(send('selectSql执行错误', 500))
      if (result.length > 0) {
        return resolve(send('用户名已存在'))
      }
      // 密码加密
      let password_bcrypt = bcrypt.hashSync(password, 10)
      // 插入数据库
      const userInfo = {
        username,
        password: password_bcrypt,
        sex: 1,
        email,
        mobile,
        avatar: '/avatar/1.jpg',
        user_role,
        create_time: getNowTime(),
        status: 1,
        del_flag: 0
      }
      const insertSql = 'insert into b_user set ?'
      db.query(insertSql, userInfo, (err, result) => {
        if (err) return resolve(send('insertSql执行错误', 500))
        if (result.affectedRows !== 1) {
          return resolve(send('注册用户失败'))
        } else {
          return resolve(send('注册成功', 0))
        }
      })
    })
  })
  ctx.body = ctxBody
}

/**
 * 用户登录
 */
exports.login = async (ctx) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    !username && (ctx.body = send('请输入用户名'))
    !password && (ctx.body = send('请输入密码'))
    return
  }
  // 登录处理

  const ctxBody = await new Promise((resolve, reject) => {
    const selectSql = `select * from b_user where username = ? and del_flag = 0`
    return db.query(selectSql, username, (err, result) => {
      if (err) return resolve(send('selectSql执行错误', 500))
      if (result.length === 0) {
        return resolve(send('用户名不存在'))
      }
      const compareResult = bcrypt.compareSync(password, result[0].password)
      if (!compareResult) {
        return resolve(send('密码错误'))
      }
      const user = {
        id: result[0].id,
        username: result[0].username,
        user_role: result[0].user_role,
        create_time: formatTime(result[0].create_time)
      }
      const tokenStr = jwt.sign(user, config.jwtSecretKey, {
        expiresIn: config.expiresIn
      })
      return resolve({
        status: 0,
        message: '登录成功',
        token: 'Bearer ' + tokenStr
      })
    })
  })
  ctx.body = ctxBody
}
