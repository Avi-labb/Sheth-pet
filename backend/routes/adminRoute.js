import express from 'express'
import { loginAdmin, logoutAdmin, resetPassword, sendOtp, verifyOtp } from '../controllers/adminController.js'

const router=express.Router()

router.post('/login',loginAdmin)
router.post('/send-otp',sendOtp)
router.post('/verify-otp',verifyOtp)
router.post('/reset-password',resetPassword)
router.post('/logout',logoutAdmin)

export default router;