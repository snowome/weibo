const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')

const {loginCheck} = require('../../middlewares/loginChecks.js')
const {saveFile} = require('../../controller/utils.js')

router.prefix('/api/utils')

// 上传图片
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
    const file = ctx.req.files['file']
    const {name, type, size, path } = file
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path,
    })
})

module.exports = router
