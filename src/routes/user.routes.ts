import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'

const userRoutes = Router()

const userController = new UserController()

userRoutes.post('/', userController.create)

userRoutes.get('/', userController.index)

userRoutes.get('/:id', userController.show)

userRoutes.put('/:id', userController.update)

userRoutes.patch('/:id/language', userController.updateLanguage)

userRoutes.delete('/:id', userController.delete)

export { userRoutes }
