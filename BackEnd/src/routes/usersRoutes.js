import { Router } from 'express'
import { createUser, deleteUser, getUser, listUsers, updateUser } from '../controllers/usersController.js'
import { validateEmailInBody } from '../middlewares/validateEmail.js'

const router = Router()

router.get('/', listUsers)
router.get('/:id', getUser)
router.post('/', validateEmailInBody('email'), createUser)
router.put('/:id', validateEmailInBody('email'), updateUser)
router.delete('/:id', deleteUser)

export default router
