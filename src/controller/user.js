const { getUserInfo } = require('../services/user.js')
const { SuccessModel, ErrorModel } = require('../model/ResModell.js')
const {
    registerUserNameNotExistInfo
} = require('../model/ErrorInfo.js')

async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

module.exports = {
    isExist
}
