const { DEFAULT_PICTURE } = require('../conf/constants.js')

function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

function formatUser(list) {
    if (list == null) {
        return list
    }
    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }

    return _formatUserPicture(list)
}

module.exports = {
    formatUser
}
