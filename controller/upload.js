const { send } = require('../utils')

// 单文件上传
exports.upload_file = async (ctx) => {
  let firstKey = Object.keys(ctx.request.files)[0]
  console.log(ctx.request.files, 'ctx.request.files------' + firstKey)
  const files = ctx.request.files[firstKey]
  ctx.body = send('上传成功', 0, files.newFilepath)
}

// 多文件上传
exports.upload_files = async (ctx) => {
  const files = ctx.request.files['files']
  let paths = []
  files.map((item) => {
    paths.push(item.newFilepath)
  })
  ctx.body = send('上传成功', 0, paths)
}

// 单图片上传
exports.upload_image = async (ctx) => {
  const files = ctx.request.files['images']
  ctx.body = send('上传成功', 0, files.newFilepath)
}

// 多图片上传
exports.upload_images = async (ctx) => {
  const files = ctx.request.files['images']
  let paths = []
  files.map((item) => {
    paths.push(item.newFilepath)
  })
  ctx.body = send('上传成功', 0, paths)
}

// 单视频上传
exports.upload_video = async (ctx) => {
  const files = ctx.request.files['images']
  ctx.body = send('上传成功', 0, files.newFilepath)
}

// 单视频上传
exports.upload_videos = async (ctx) => {
  const files = ctx.request.files['images']
  let paths = []
  files.map((item) => {
    paths.push(item.newFilepath)
  })
  ctx.body = send('上传成功', 0, paths)
}
