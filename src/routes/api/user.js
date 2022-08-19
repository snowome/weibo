const router = require('koa-router')()
const {isExist, register, login, deleteCurUser} = require('../../controller/user.js')
const userValidate = require('../../validator/user.js')
const {genValidator} = require('../../middlewares/validator.js')
const {loginCheck} = require('../../middlewares/loginChecks.js')
const {isTest} = require('../../utils/env.js')

router.prefix('/api/user')

router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const {userName, password, gender} = ctx.request.body
    ctx.body = await register({userName, password, gender})
})

router.post('/isExist', async (ctx, next) => {
    const {userName} = ctx.request.body
    ctx.body = await isExist(userName)
})

router.post('/login', async (ctx, next) => {
    const {userName, password} = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        const {userName} = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

module.exports = router
