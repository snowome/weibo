const Sequelize = require('./sequelize.js')
// require('./model.js')

// 测试连接
Sequelize.authenticate().then(() => {
    console.log('数据库连接成功')
}).catch(e => {
    console.log('数据库连接失败')
})

// 执行同步, force: true是指如果标不存在，则删除重建
Sequelize.sync({ force: false }).then(() => {
    console.log('同步成功')
    process.exit()
})
