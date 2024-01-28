const { koaBody } = require('koa-body') // 请求数据处理
const fs = require('fs') // 文件处理

koaBody({
  multipart: true, // 是否支持多文件上传
  patchKoa: true, // 将请求体打到koa的ctx.request中
  formidable: {
    keepExtensions: true, // 保留文件后缀
    patchKoa: true, // 将请求体打到koa的ctx.request中
    maxFileSize: 10 * 1024 * 1024,
    maxFieldsSize: 10 * 1024 * 1024, // 文件上传大小限制10MB
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

module.exports = koaBody
