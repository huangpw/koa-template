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

const messages = {
  0: '成功',
  1: '失败',
  401: 'token已过期',
  500: '服务器内部错误'
}

// 获取当前日期时间
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