const Koa = require('koa')
const app = new Koa()
const router = require('./router') // 接口路由
const cors = require('koa-cors') // 跨域
const static = require('koa-static') // 静态目录处理
const path = require('path') // 路径处理
const koaJWT = require('koa-jwt') // token验证
const config = require('./utils/config') // token秘钥
const { checkToken } = require('./utils/checkToken')
const koaBody = require('./utils/koaBody')

// 允许跨域
app.use(cors())
// 静态文件
app.use(static(path.join(__dirname, '/public')))

// 身份认证错误中间件
app.use(checkToken)

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证(这里需要注意，secret必须配置algorithms属性)
// path: [/^\/blog/, /^\/test/]
app.use(
  koaJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/login/, /^\/register/, /^\/blog/]
  })
)

// 解析请求数据，提供文件上传
app.use(koaBody())
// 注册路由
app.use(router.routes()).use(router.allowedMethods())

const port = 8006
app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port)
})
