import dotenv from 'dotenv'
import { resolve } from 'path'

const parsedEnv = dotenv.config({
  path: resolve(__dirname, '..', '..', '.env'),
})

const parsedEnvLocal = dotenv.config({
  path: resolve(__dirname, '..', '..', '.env.local'),
})

const parsed = {
  ...parsedEnv.parsed,
  ...parsedEnvLocal.parsed,
}
const config = {
  appPort: parsed?.APP_PORT,
  mode: parsed?.NODE_ENV,
  jwtSecret: parsed?.JWT_SECRET || 'secret',
  passwordHash: parsed?.PASSWORD_HASH || 'hash_password',

  cors: {
    allowedOrigin: parsed?.CORS_ALLOWED_ORIGIN || '*',
    allowedHeaders: parsed?.CORS_ALLOWED_HEADERS || '*',
  },

  db: {
    url: parsed?.DATABASE_URL,
    password: parsed?.DATABASE_PASSWORD,
  },

  passport: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  client: {
    url: parsed?.CLIENT_URL,
  },
  SMS_BASIC_AUTH: process.env.SMS_BASIC_AUTH,
  SMS_URL: process.env.SMS_URL,
  SMS_SENDER: process.env.SMS_SENDER,
}

export default config
