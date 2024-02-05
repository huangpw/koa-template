const Router = require('koa-router')
const email = new Router()
const { randomString, send } = require('../utils')
const { sendEmail } = require('../controller/email')
const { saveVerify } = require('../controller/verify')

email.post('/send/email', async (ctx) => {
  try {
    const code = randomString(6)
    const content = `<div>
        <h3>邮箱验证码</h3>
        <p>您的验证码是：<span style="color:lightskyblue;font-weight: bold;padding: 0 10px;">${code}</span>，请在 10 分钟内进行验证！<p>
        <p>如果该验证码不为您本人申请，请忽略无视！</p>
    </div>`
    const title = '欢迎注册！'

    const res1 = await saveVerify('1042850644@qq.com', code)
    let res2 = send('发送失败', 1)
    if (res1.status == 0) {
      res2 = await sendEmail('1042850644@qq.com', title, content)
    }
    ctx.body = res1.status == 1 ? res1 : res2
  } catch (err) {
    ctx.body = {
      code: 1,
      msg: err.message
    }
  }
})

module.exports = email
