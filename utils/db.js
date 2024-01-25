const mysql = require('mysql')

const db = mysql.createPool({
  host: '8.140.200.150',
  port: 3306,
  database: 'koa_server',
  user: 'koa_admin',
  password: 'WP5yZBCrsRnknFmA'
})

db.getConnection((err, connection) => {
  if (err) {
    console.log('数据库连接失败')
    console.log(err)
  } else {
    console.log('数据库连接成功')
  }
})

module.exports = db
