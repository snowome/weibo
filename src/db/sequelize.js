const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db.js')
const { isProd, isTest } = require('../utils/env.js')

const conf = {
    host: MYSQL_CONF.host,
    dialect: 'mysql',
    timezone: '+08:00',
}

if (isTest) {
    conf.logging = () => {}         // 单元测试的时候不打印SQL语句
}

// 线上环境使用连接池
if (isProd) {
    conf.pool = {
        max: 5,       // 连接池中最大的连接数量
        min: 0,       // 最小
        idle: 10000,  // 如果一个连接 10秒未被使用，则释放
    }
}

module.exports = new Sequelize(MYSQL_CONF.database, MYSQL_CONF.urser, MYSQL_CONF.password, conf)
