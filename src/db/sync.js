const Sequelize = require('./sequelize.js')
require('./model/index')

// 测试连接
Sequelize.authenticate().then(() => {
    console.log('数据库连接成功')
}).catch(e => {
    console.log('数据库连接失败')
})

// 执行同步, force: true是指如果标存在，则删除重建
Sequelize.sync({ force: true }).then(() => {
    console.log('同步成功')
    process.exit()
})
