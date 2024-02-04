const Router = require('koa-router')
const smsRouter = new Router()
const { sendSms } = require('../controller/sms')

smsRouter.post('/send/sms', sendSms)

module.exports = smsRouter
