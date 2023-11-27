import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import AppError from '../utils/helpers/AppError'

export const allowedRoles =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.authorUser.role))
      return next(new AppError(+httpStatus[403], 'You do not have permission to perfom this action.'))
    next()
  }
