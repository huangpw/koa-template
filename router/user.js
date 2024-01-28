const Router = require('koa-router')
const user = Router()

const { register, login } = require('../controller/user')

user.post('/register', register)

user.post('/login', login)

module.exports = user
