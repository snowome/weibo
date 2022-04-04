const server = require('./server.js')

test('接口数据返回正确？', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
})
