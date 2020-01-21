const Koa = require('koa')
const controller = require('./controller')
const { port } = require('./configuration')

new Koa()
  .use(controller.routes())
  .use(controller.allowedMethods())
  .listen(port)
