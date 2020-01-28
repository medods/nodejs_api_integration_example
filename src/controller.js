const Router = require('koa-router')
const JwtTokenService = require('./jwt_token_service')

const router = new Router()

router.get('/token', async ctx => {
  const jwtToken = await JwtTokenService.getInstance().getToken()

  ctx.body = { jwtToken }
})

router.get('/update_token', async ctx => {
  const jwtToken = await JwtTokenService.getInstance().updateToken()

  ctx.body = { jwtToken }
})

module.exports = router
