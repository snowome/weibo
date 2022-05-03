const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const jwtkoa = require('koa-jwt')
const { SECRET } = require('./conf/constants.js')

const {REDIS_CONF} = require('./conf/db.js')
const { isProd, isTest } = require('./conf/env.js')

const index = require('./routes')
const userViewRouter = require('./routes/view/user.js')
const userApiRouter = require('./routes/api/user.js')
const usersJWT = require('./routes/usersJWT')
const errorViewRouter = require('./routes/view/error')

// error handler
let onErrorConfig = {}
if (isProd) {
    onErrorConfig.redirect = '/error'
}
onerror(app, onErrorConfig)
/**
app.use(
    jwtkoa(
        { secret: SECRET }
    )
    // 不用哪些目录，忽略哪些请求不适用jwt验证
    .unless({
        path: [/^\/users\/login/]
    })
)
**/
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// session配置
app.keys = ['hehe_123']
app.use(session({
    key: 'weibo.sid',           // cookie name，默认'koa.sid'
    prefix: 'weibo:sess:',      // redis key 的前缀，默认：'koa:sess:'
    cookie: {
        path: '/',              // 网站的所有地方都可以访问
        httpOnly: true,         // 服务端可以修改，客户端不可以修改
        maxAge: 24 * 60 * 60 * 1000,
    },
    // ttl: 24 * 60 * 60 * 1000,   // redis过期时间，不写默认是cookie的maxAge
    store: redisStore({         // 保存在redis中
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    }),
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(usersJWT.routes(), usersJWT.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
