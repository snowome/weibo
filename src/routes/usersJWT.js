const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)

const { SESSION_SECRET_KEY } = require('../conf/secretKeys.js')

router.prefix('/users')

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    let userInfo, token

    if (userName === 'zhangsan' && password === 'abc') {
        userInfo = {
            userId: 1,
            userName: 'zhangsan',
            nickName: '张三',
            gender: 1
        }
        token = jwt.sign(userInfo, SECRET, {
            expiresIn: '1h'
        })
    }
    if (userInfo == null) {
        ctx.body = {
            code: -1,
            msg: '登录失败',
        }
    }
    ctx.body = {
        code: 0,
        userInfo
    }
})

router.get('/user-info', async (ctx, next) => {
    const token = ctx.header.authorization
    try {
        const payload = await verify(token.split(' ')[1], SESSION_SECRET_KEY)
        ctx.body = {
            code: 0,
            userInfo: 'abc'
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            msg: 'verify token failed',
        }
    }
})


module.exports = router
