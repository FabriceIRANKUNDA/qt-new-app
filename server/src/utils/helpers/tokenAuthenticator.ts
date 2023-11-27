import jwt from 'jsonwebtoken'
import config from '../../config'
import ShortUniqueId from 'short-unique-id'

/**
 * @export
 * @class TokenAuthenticator
 */
export default class TokenAuthenticator {
  /**
   * decode a JWT token
   * @static
   * @param {string} token signed token
   * @memberof TokenAuthenticator
   * @returns {object} payload
   */
  static async decodeToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.jwtSecret, (err, decoded: Record<any, any>) => {
        if (err) {
          reject(err)
        } else {
          resolve(decoded)
        }
      })
    })
  }

  /**
   * Store data in Jwt
   * @static
   * @param {object} data data object
   * @memberof AuthenticateToken
   * @returns {object} signToken
   */
  static signToken(data: Record<any, any>) {
    const token = jwt.sign(data, config.jwtSecret)
    return token
  }

  static OTPGenerator() {
    const OTP = new ShortUniqueId({
      length: 4,
      dictionary: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    }).rnd()
    const otpExpires = new Date(Date.now() + 1000 * 60 * 1000)

    return { OTP, otpExpires }
  }
}
