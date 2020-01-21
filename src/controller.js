const Router = require('koa-router')
const JwtTokenService = require('./jwt_token_service')

const router = new Router()

router.get('/token', async ctx => {
  ctx.body = await JwtTokenService.getInstance().getToken()
})

router.get('/update_token', async ctx => {
  ctx.body = await JwtTokenService.getInstance().updateToken()
})

module.exports = router
