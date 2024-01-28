exports.checkToken = async (ctx, next) => {
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
        message: '超出文件上传大小限制(10MB)'
      })
    } else {
      // 其他错误
      return (ctx.body = {
        status: 500,
        message: '服务器内部错误' || err.message
      })
    }
  })
}
