const request = require('supertest')
const server = require('../src/app.js').callback()


module.exports = request(server)
