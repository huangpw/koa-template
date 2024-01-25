const Router = require('koa-router')
const userRouter = Router()

const { register, login } = require('../controller/user')

userRouter.post('/register', register)

userRouter.post('/login', login)

module.exports = userRouter
