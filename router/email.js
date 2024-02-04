const Router = require('koa-router')
const email = new Router()
const { randomString } = require('../utils')
const { sendEmail } = require('../controller/email')

email.post('/send/email', async (ctx) => {
  try {
    // const bodyParams = ctx.request.body
    // const { email } = bodyParams
    const code = randomString(6)
    const content = `<div>
    <h3>邮箱验证码</h3>
    <p>您的验证码是：<span style="color:lightskyblue;font-weight: bold;padding: 0 10px;">${code}</span>，请在 10 分钟内进行验证！<p>
    <p>如果该验证码不为您本人申请，请忽略无视！</p>
</div>`
    const title = '欢迎注册！'
    // // setRedisConfig(email, code)
    const res = await sendEmail('1042850644@qq.com', title, content)
    console.log(res, 'res')
    // ctx.body = {
    //   code: res.code,
    //   data: {
    //     emailRes: res,
    //     code: code
    //   },
    //   msg: 'success'
    // }
    // console.log(code, 'code')
    ctx.body = '1111'
  } catch (err) {
    ctx.body = {
      code: 1,
      msg: err
    }
  }
})

module.exports = email
