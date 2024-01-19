import express, { Response, Request } from 'express'
import config from './config'
import cors from 'cors'
import HttpStatus from 'http-status'
import { connectDB } from './db/connnect'
import ErrorHandler from './middleware/error.middleware'
import router from './routers'

const app = express()
const port = config.appPort

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to QT app APIs Server!')
})

app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use(express.text({ limit: '50mb' }))
app.use(cors({ origin: config.cors.allowedOrigin, allowedHeaders: config.cors.allowedHeaders, credentials: true }))
app.use(express.json({ limit: '50mb', type: 'application/json' }))
app.use('/files', express.static('files'))

app.use('/api/v1', router)

//Handle unknown routes
app.use('*', (req: Request, res: Response) =>
  res.status(HttpStatus.NOT_FOUND).json({
    message: 'Oops, this route does not exist',
  }),
)

app.use(ErrorHandler)

app.listen(port, () => {
  connectDB()
  console.log(`Server started at http://localhost:${port}`)
})
