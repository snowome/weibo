const { DEFAULT_PICTURE } = require('../conf/constants.js')

function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

function formatUser(list) {
    console.log(1111111111111111)
    if (list == null) {
        return list
    }
    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }
    console.log('--------------------')
    console.log(_formatUserPicture(list))
    return _formatUserPicture(list)
}

module.exports = {
    formatUser
}
