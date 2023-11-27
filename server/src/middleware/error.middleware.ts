import { Request, Response, NextFunction } from 'express'
import { Error } from 'mongoose'
import AppError from '../utils/helpers/AppError'
import config from '../config'

const handleDuplicateFieldsErrorDB = () => {
  return new AppError(400, 'Duplicate detected, Please try to use other values')
}
const handleCastErrorDB = (error: Error.CastError) => {
  const message = `Invalid ${error.path}: ${error.value}`
  return new AppError(400, message)
}

const handleValidationErrorDB = (error: Error.ValidationError) => {
  const errors = Object.values(error.errors).map((el) => el?.message)
  const message = `Invalid input. ${errors.join('. ')}`
  return new AppError(400, message)
}

const sendProdErr = (err: any | AppError, res: Response) => {
  // Operational, known error: send message to client
  if (err instanceof AppError) {
    res.status(err.code).json({
      status: err.status,
      message: err.message,
    })

    // Programming or other unknown error: don't show error details to the client
  } else {
    // 1) Log error
    console.error('ERROR 💥', err)
    // 2) Send simple message for unknown error
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    })
  }
}

const sendDevErr = (err: any | AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

export default (err: any | AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  if (config.mode.startsWith('production')) {
    let error = { ...err }
    if (error.name === 'CastError') error = handleCastErrorDB(error)
    if (error.code === 11000) error = handleDuplicateFieldsErrorDB()
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error)
    sendProdErr(error, res)
  } else if (process.env.NODE_ENV === 'development') {
    sendDevErr(err, res)
  }
}
