const jwt = require('jsonwebtoken')
const configuration = require('./configuration')

const ALGORITHM = 'HS512'

module.exports = class JwtTokenService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new JwtTokenService(
        configuration.identity,
        configuration.secretKey,
        configuration.tokenExpirationTime
      )
      this.instance.initialize()
    }

    return this.instance
  }

  constructor(identity, secretKey, tokenExpirationTime) {
    this.identity = identity
    this.secretKey = secretKey
    this.tokenExpirationTime = tokenExpirationTime
    this.token = null
    this.updateTokenPromise = null

    this.getToken = this.getToken.bind(this)
    this.updateToken = this.updateToken.bind(this)
  }

  initialize() {
    const interval = (this.tokenExpirationTime / 2) * 1000
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
      const iss = this.identity
      // issued at
      const iat = Math.floor(Date.now() / 1000)
      // expiration
      const exp = iat + this.tokenExpirationTime

      jwt.sign(
        { iss, iat, exp },
        this.secretKey,
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

    return this.getToken()
  }
}
