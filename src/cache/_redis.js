const redis = require('redis')
const { REDIS_CONF } = require('../conf/db.js')

// 创建客户端
const redisConn = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisConn.on('error', err => {
    console.error('redis error', err)
})

function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisConn.set(key, val)
    redisConn.expire(key, timeout)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisConn.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try {
                resolve(JSON.parse(val))
            } catch (e) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}
