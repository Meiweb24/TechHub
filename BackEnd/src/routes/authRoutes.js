import { Router } from 'express'
import { login, register } from '../controllers/authController.js'
import { validateEmailInBody } from '../middlewares/validateEmail.js'

const router = Router()

router.post('/login', login)
router.post('/register', validateEmailInBody('email'), register)

export default router
