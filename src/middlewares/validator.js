/**
 * @description json schema 验证中间件
 */
const {ErrorModel} = require('../model/ResModell.js')
const {jsonSchemaFileInfo} = require('../model/ErrorInfo.js')


/**
 * 生成 json schema 验证的中间件
 * @param {function} validateFn 验证函数
 */
function genValidator(validateFn) {
    // 定义中间件函数
    async function validator(ctx, next) {
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            // 验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        // 验证成功，继续
        await next()
    }

    return validator
}

module.exports = {
    genValidator
}
