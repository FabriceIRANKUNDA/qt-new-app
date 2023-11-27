import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import passport from 'passport'

const router = Router()

router.get('/login/success', AuthController.loginSuccess)
router.get('/login/failed', AuthController.loginFailed)

router.get(
  '/google/callback',
  passport.authenticate('google', { successRedirect: 'http://localhost:3000', failureRedirect: '/login/failed' }),
)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/logout', AuthController.logout)

router.post('/login', AuthController.login)
router.post('/signup', AuthController.createAccount)
router.post('/forget-password', AuthController.createPasswordResetToken)
router.post('/reset-password', AuthController.resetPassword)
router.post('/verify-otp', AuthController.verfiyPasswordResetToken)

router.post('/profile/:id', AuthController.updateProfile)

export default router
