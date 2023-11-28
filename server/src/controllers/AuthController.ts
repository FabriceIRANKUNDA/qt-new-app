import { Request, Response, NextFunction } from 'express'
import catchAsyncError from '../utils/helpers/catchAsyncError'
import AppError from '../utils/helpers/AppError'
import httpStatus from 'http-status'
import { hashPassword, matchPassword } from '../utils/helpers/hashPassword'
import { User } from '../db/models/User'
import TokenAuthenticator from '../utils/helpers/tokenAuthenticator'
import { comparePassword } from '../utils/helpers/ComparePassword'
import SendSMS from '../utils/helpers/SendSMS'
import { CRUDHandler } from '../utils/helpers/CRUDHandler'

export class AuthController {
  static createAccount = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { names, email, password, phone, confirmPassword } = req.body
    if (!phone || !password) return next(new AppError(httpStatus.BAD_REQUEST, 'Phone and password must be provided!'))

    if (!comparePassword(password, confirmPassword))
      return next(new AppError(httpStatus.BAD_REQUEST, 'Passwords are not the same!.'))
    const hashedPassword = hashPassword(password)

    const user = (await User.create({ names, email, phone, password: hashedPassword, confirmPassword })).toObject()
    const token = TokenAuthenticator.signToken(user)

    return res.status(httpStatus.OK).json({
      status: 'success',
      token,
      user,
    })
  })

  static login = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    if (!email || !password) return next(new AppError(httpStatus.BAD_REQUEST, 'Email and password must be provided!'))

    const user = await User.findOne({ email }).select('+password').exec()

    if (!user)
      return next(new AppError(httpStatus.NOT_FOUND, 'Please make sure you have an account! or Go ahead to /signup'))

    if (!matchPassword(password, user.password))
      return next(new AppError(httpStatus.UNAUTHORIZED, 'Incorrect email or Password'))

    const token = TokenAuthenticator.signToken(user.toObject())
    user.password = undefined
    res.status(httpStatus.OK).json({
      status: 'success',
      token,
      user,
    })
  })

  static loginFailed = (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.UNAUTHORIZED).json({
      status: 'failed',
      message: 'Login failed',
    })
  }

  static loginSuccess = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      return res.status(httpStatus.OK).json({
        message: 'Successfully logged in',
        status: 'success',
        user: req.user,
        token: TokenAuthenticator.signToken(req.user),
      })
    }

    return res.status(httpStatus.UNAUTHORIZED).json({ status: 'failed', message: 'Not authorized' })
  }

  static logout = (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err) {
      if (err) {
        return next(err)
      }
      return res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Successfully logged out',
      })
    })
  }

  static createPasswordResetToken = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { phone } = req.body
    const user = await User.findOne({ phone })
    if (!user) return next(new AppError(httpStatus.NOT_FOUND, 'User not found!'))

    const { OTP, otpExpires } = TokenAuthenticator.OTPGenerator()

    const result = await new SendSMS(user, OTP, process.env.SMS_URL).sendOtpCodeSMS()

    if (!result.success) {
      return next(new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Sending SMS fails, please try again later'))
    }

    user.passwordResetToken = OTP
    user.passwordResetExpires = otpExpires
    await user.save({ validateBeforeSave: false })

    return res.status(httpStatus.OK).json({
      status: 'success',
      message: 'OTP sent successfully',
    })
  })

  static verfiyPasswordResetToken = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { otp } = req.body
    const newUser = await User.findOneAndUpdate(
      {
        passwordResetToken: otp,
        passwordResetExpires: { $gt: Date.now() },
      },
      { isPasswordResetTokenVerified: true },
      { new: true },
    )

    if (!newUser) return next(new AppError(httpStatus.BAD_REQUEST, 'OTP is invalid or has expired'))

    return res.status(httpStatus.OK).json({
      status: 'success',
    })
  })

  static resetPassword = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { otp } = req.body
    const newUser = await User.findOne({
      passwordResetToken: otp,
      passwordResetExpires: { $gt: Date.now() },
      isPasswordResetTokenVerified: true,
    })

    if (!newUser) return next(new AppError(httpStatus.BAD_REQUEST, 'OTP is invalid or has expired'))

    newUser.passwordResetToken = undefined
    newUser.passwordResetExpires = undefined
    newUser.password = hashPassword(req.body.password)

    await newUser.save({ validateBeforeSave: false })
    const token = TokenAuthenticator.signToken(newUser.toObject())

    return res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Password reset successful',
      data: {
        token,
        user: newUser,
      },
    })
  })

  static updateProfile = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndUpdate(req.authorUser.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!user) return next(new AppError(httpStatus.NOT_FOUND, 'No User found with that ID'))
    const token = TokenAuthenticator.signToken(user.toObject())
    return res.status(httpStatus.OK).json({
      status: 'success',
      data: { user, token },
    })
  })
}
