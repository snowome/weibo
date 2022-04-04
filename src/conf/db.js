const { isDev, isProd } = require('./env.js')

let REDIS_CONF = {
    host: '127.0.0.1',
    port: 6379,
}

let MYSQL_CONF = {
    host: '127.0.0.1',
    urser: 'root',
    password: '123456',
    port: 3306,
    database: 'weibo'
}

if (isDev) {
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379,
    }

    MYSQL_CONF = {
        host: '127.0.0.1',
        urser: 'root',
        password: '123456',
        port: 3306,
        database: 'weibo'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}
