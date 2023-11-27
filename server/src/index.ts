import express, { Response, Request } from 'express'
import config from './config'
import cors from 'cors'
import HttpStatus from 'http-status'
import { connectDB } from './db/connnect'
import ErrorHandler from './middleware/error.middleware'
import router from './routers'
import cookieSession from 'cookie-session'
import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import { sessionMiddleware } from './middleware/session.middleware'
import { deserializeUser } from './utils/helpers/deserializeUser'
import { serializeUser } from './utils/helpers/serializeUser'

const app = express()
const port = config.appPort

// define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to saloon APIs Server!')
})

app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use(express.text({ limit: '50mb' }))
app.use(cors({ origin: config.cors.allowedOrigin, allowedHeaders: config.cors.allowedHeaders, credentials: true }))
app.use(express.json({ limit: '50mb', type: 'application/json' }))

app.use(cookieSession({ name: 'session', keys: ['qt-app'], maxAge: 24 * 60 * 60 * 1000 }))
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

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

passport.serializeUser(serializeUser)

passport.deserializeUser(deserializeUser)

app.use('/api/v1', router)

//Handle unknown routes
app.use('*', (req: Request, res: Response) =>
  res.status(HttpStatus.NOT_FOUND).json({
    message: 'Oops, this route does not exist',
  }),
)

// Configure global error handler
app.use(ErrorHandler)

// start the Express server
app.listen(port, () => {
  // Connect to Database
  connectDB()
  console.log(`Server started at http://localhost:${port}`)
})
