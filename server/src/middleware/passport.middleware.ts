import { Strategy } from 'passport-google-oauth20'
import passport from 'passport'
import config from '../config'

passport.use(
  new Strategy(
    {
      clientID: config.passport.clientId,
      clientSecret: config.passport.clientSecret,
      callbackURL: config.passport.callbackURL,
      scope: ['profile', 'email'],
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile)
    },
  ),
)

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})
