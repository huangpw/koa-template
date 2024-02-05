const { send, getNowTime, validateValue } = require('../utils')
const db = require('../utils/db')

/**
 * 保存验证码
 * 1000：非手机号码，非邮箱
 * 1001：手机号码
 * 1002：邮箱
 */
exports.saveVerify = async (value, code) => {
  return await new Promise((resolve, reject) => {
    const resCode = validateValue(value)
    if (resCode === 1000) {
      return resolve(send('手机号码或邮箱不正确'))
    } else {
      const verify = {
        mobile: resCode === 1001 ? value : '',
        email: resCode === 1002 ? value : '',
        code,
        create_time: getNowTime(),
        status: 1
      }
      const insertSql = 'insert into b_verify set ?'
      db.query(insertSql, verify, (err, result) => {
        if (err) return resolve(send('insertSql执行错误', 500))
        if (result.affectedRows !== 1) {
          return resolve(send('添加失败'))
        } else {
          return resolve(send('添加成功', 0))
        }
      })
    }
  })
}

/**
 * 修改验证码状态
 */

exports.updateVerify_status = async (contact) => {}

// function validateInput(input) {
//   var mobileRegex = /^1[3456789]\d{9}$/
//   var emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
//   if (mobileRegex.test(input)) {
//     console.log('这是一个手机号码')
//   } else if (emailRegex.test(input)) {
//     console.log('这是一个邮箱地址')
//   } else {
//     console.log('输入的数据不合法')
//   }
// }
