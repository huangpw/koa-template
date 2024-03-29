const dayjs = require('dayjs')

/**
 * 返回数据
 * @param {*} message
 * @param {*} status 0: 成功；1: 失败；401：token已过期；500：服务器内部错误
 * @param {*} data
 * @returns
 */
exports.send = (message, status = 1, data) => {
  return {
    status,
    message: message ? message : messages[status],
    data
  }
}
// 枚举对象
const messages = {
  0: '成功',
  1: '失败',
  401: 'token已过期',
  500: '服务器内部错误'
}

/**
 * 获取当前日期时间
 * @returns 'YYYY-MM-DD HH:mm:ss'
 */
exports.getNowTime = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

// 获取当前日期
exports.getNowDate = () => {
  return dayjs().format('YYYY-MM-DD')
}

// 格式化时间
exports.formatTime = (data) => {
  if (!data) return ''
  return dayjs(data).format('YYYY-MM-DD HH:mm:ss')
}

// 目录
exports.directorys = {
  file: 'files',
  files: 'files',
  image: 'images',
  images: 'images',
  video: 'videos',
  videos: 'videos',
  other: 'others'
}

// 随机编码
exports.randomString = (length) => {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  var randomString = ''
  for (var i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return randomString
}

// dayjs计算两个日期超过10分钟
// const dayjs = require('dayjs');

// const date1 = dayjs('2023-07-06T10:00:00');
// const date2 = dayjs('2023-07-06T10:11:00');

// const diffInMinutes = date2.diff(date1, 'minute');

// if (diffInMinutes > 10) {
//   console.log('两个日期之间的时间差超过10分钟');
// } else {
//   console.log('两个日期之间的时间差未超过10分钟');
// }

// 区分手机号码和邮箱
exports.validateValue = (value) => {
  var mobileRegex = /^1[3456789]\d{9}$/
  var emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (mobileRegex.test(value)) {
    return 1001
  } else if (emailRegex.test(value)) {
    return 1002
  } else {
    return 1000
  }
}
