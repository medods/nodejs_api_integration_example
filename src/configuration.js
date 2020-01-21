const { env } = process

module.exports = Object.freeze({
  port: env.HTTP_SERVER_PORT || '29500',
  identity: env.IDENTITY,
  secretKey: env.SECRET_KEY,
  tokenExpirationTime: parseInt((env.TOKEN_EXPIRATION_TIME || 64), 10)
})
