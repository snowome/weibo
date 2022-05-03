const { User } = require('../db/model/index.js')
const { formatUser } = require('./_format.js')

async function getUserInfo(userName, password) {
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, {password})
    }

    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })

    if (result == null) {
        return result
    }

    const formatRes = formatUser(result.dataValues)

    return formatRes
}

module.exports = {
    getUserInfo
}