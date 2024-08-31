import express from "express"
import { createUser, verifyToken, logInUser, getResetPassword, setNewPassword } from '../controllers/authController.js'
import { check } from 'express-validator'

const  router = express.Router()

router.post('/',
[
	check('email', 'por favor ingrese un email valido').isEmail(),
	check('password', 'por favor ingrese un password con mas de 8 caracteres').isLength({ min: 8 })
],
 createUser)

router.get('/verify', verifyToken)
router.post('/login', logInUser)

router.post('/request-password-reset', getResetPassword)
router.post('/reset-password', setNewPassword)

export default router