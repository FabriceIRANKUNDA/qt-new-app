import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { protectedRoutes } from '../middleware/authenticated'

const router = Router()

router.post('/login', AuthController.login)
router.post('/signup', AuthController.createAccount)
router.post('/forget-password', AuthController.createPasswordResetToken)
router.post('/reset-password', AuthController.resetPassword)
router.post('/verify-otp', AuthController.verfiyPasswordResetToken)

router.use(protectedRoutes)
router.patch('/profile/:id', AuthController.updateProfile)

export default router
