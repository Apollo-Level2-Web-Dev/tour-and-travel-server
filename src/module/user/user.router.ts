import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { userController } from './user.controller'
import { UserValidation } from './user.validation'

const userRouter = Router()

userRouter.post(
    '/create-user',
    validateRequest(UserValidation.userValidationSchema),
    userController.createUser
)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/', userController.getUser)

export default userRouter
