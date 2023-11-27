import { Request, Response, NextFunction } from 'express'
import catchAsyncError from '../utils/helpers/catchAsyncError'
import AppError from '../utils/helpers/AppError'
import httpStatus from 'http-status'
import TokenAuthenticator from '../utils/helpers/tokenAuthenticator'
import { User } from '../db/models/User'
import { Employee } from '../db/models/Employee'
import { Document } from 'mongoose'

export const protectedRoutes = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.header('x-auth-token') ||
    req.params['x-auth-token'] ||
    req.params['token'] ||
    req.query['token'] ||
    (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
      ? req.headers.authorization.split(' ')[1]
      : undefined

  if (!token) return next(new AppError(httpStatus.UNAUTHORIZED, 'You are not logged in! Please login first!'))

  const payload: Record<any, any> = await TokenAuthenticator.decodeToken(token)

  let currentUser: Document<any> | null

  if (payload.role === 'owner') {
    currentUser = await User.findById(payload.id)
  } else {
    currentUser = await Employee.findById(payload.id)
  }

  if (!currentUser)
    return next(new AppError(httpStatus.UNAUTHORIZED, 'Token belongs to the user who is no longer exist!.'))

  const assertUser: { role: string; id: string; firstName: string; lastName: string; phone: string; password: string } =
    currentUser.toObject()

  req.authorUser = assertUser
  next()
})
