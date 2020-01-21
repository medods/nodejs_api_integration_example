const jwt = require('jsonwebtoken')
const {
  identity,
  secretKey,
  tokenExpirationTime
} = require('./configuration')

const ALGORITHM = 'HS512'

module.exports = class JwtTokenService {
  constructor() {
    this.token = null
    this.updateTokenPromise = null

    this.getToken = this.getToken.bind(this)
    this.updateToken = this.updateToken.bind(this)

    const interval = (tokenExpirationTime / 2) * 1000
    setInterval(this.updateToken, interval)

    this.updateToken()
  }

  getToken() {
    if (this.token) return Promise.resolve(this.token)
    return this.updateTokenPromise
  }

  updateToken() {
    if (this.updateTokenPromise) return this.updateTokenPromise

    this.token = null
    this.updateTokenPromise = new Promise((resolve, reject) => {
      // issuer
      const iss = identity
      // issued at
      const iat = Math.floor(Date.now() / 1000)
      // expiration
      const exp = iat + tokenExpirationTime

      jwt.sign(
        { iss, iat, exp },
        secretKey,
        { algorithm: ALGORITHM },
        (err, token) => {
          if (err) reject(err)
          else resolve(token)
        }
      )
    })

    this
      .updateTokenPromise
      .then(token => { this.token = token })
      .catch(err => console.error(err))
      .finally(() => { this.updateTokenPromise = null })

    return this.updateTokenPromise
  }
}
