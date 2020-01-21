const Router = require('koa-router')
const JwtTokenService = require('./jwt_token_service')

const jwtTokenService = new JwtTokenService()
const router = new Router()

router.get('/token', async ctx => {
  ctx.body = await jwtTokenService.getToken()
})

router.get('/update_token', async ctx => {
  ctx.body = await jwtTokenService.updateToken()
})

module.exports = router
