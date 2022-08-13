const router = require('koa-router')()
const { isExist, register } = require('../../controller/user.js')
const userValidate = require('../../validator/user.js')

router.prefix('/api/user')

router.post('/register', async (ctx, next) => {
    // 校验
    userValidate()
}, async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({ userName, password, gender })
})

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

module.exports = router