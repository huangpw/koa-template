const Router = require('koa-router')
const upload = new Router()
const {
  upload_file,
  upload_files,
  upload_image,
  upload_images,
  upload_video,
  upload_videos
} = require('../controller/upload')
/**
 * 单文件长传：files
 */
upload.post('/upload_file', upload_file)
/**
 * 多文件上传：files
 */
upload.post('/upload_files', upload_files)
/**
 * 单图片上传：images
 */
upload.post('/upload/image', upload_image)
/**
 * 多图片上传：images
 */
upload.post('/upload/images', upload_images)
/**
 * 单视频上传：videos
 */
upload.post('/upload/video', upload_video)
/**
 * 多视频上传：videos
 */
upload.post('/upload/videos', upload_videos)

module.exports = upload
