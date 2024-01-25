const Koa = require('koa')
const app = new Koa()
const router = require('./router') // 接口路由
const cors = require('koa-cors') // 跨域
const static = require('koa-static') // 静态目录处理
const path = require('path') // 路径处理
const { koaBody } = require('koa-body') // 请求数据处理
const koaJWT = require('koa-jwt') // token验证
const config = require('./utils/config') // token秘钥
const fs = require('fs') // 文件处理

// 允许跨域
app.use(cors())
// 静态文件
app.use(static(path.join(__dirname, '/public')))

// 身份认证错误中间件
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      // 自定义返回结果（Token失效）
      ctx.status = 401
      return (ctx.body = {
        status: 401,
        message: '身份认证失败' || err.message
      })
    } else if (err.message.indexOf('maxFileSize') !== -1) {
      // 文件上传大小限制
      return (ctx.body = {
        status: 1,
        message: '超出文件上传大小限制(50MB)'
      })
    } else {
      // 其他错误
      return (ctx.body = {
        status: 500,
        message: '服务器内部错误' || err.message
      })
    }
  })
})

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证(这里需要注意，secret必须配置algorithms属性)
// path: [/^\/blog/, /^\/test/]
app.use(
  koaJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/login/, /^\/register/, /^\/blog/]
  })
)

// 解析请求数据，提供文件上传
app.use(
  koaBody({
    multipart: true, // 是否支持多文件上传
    patchKoa: true, // 将请求体打到koa的ctx.request中
    formidable: {
      keepExtensions: true, // 保留文件后缀
      patchKoa: true, // 将请求体打到koa的ctx.request中
      maxFileSize: 50 * 1024 * 1024,
      maxFieldsSize: 50 * 1024 * 1024, // 文件上传大小限制10MB
      onFileBegin: (name, file) => {
        // 保存到此文件夹目录下
        const dir = path.resolve(__dirname, `./public/uploads/${name}`)
        // 检查文件夹是否存在，如果不存在则新建文件夹
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir)
        }
        // 覆盖文件存放的完整路径(保留原始名称)
        file.filepath = `${dir}/${file.newFilename}`
        file.newFilepath = `/uploads/${name}/${file.newFilename}`
      },
      onError(err) {
        console.log(err, 'koaBody')
      }
    }
  })
)

app.use(router.routes()).use(router.allowedMethods())

const port = 8006
app.listen(port, () => {
  console.log('Server is running at http://localhost:' + port)
})
