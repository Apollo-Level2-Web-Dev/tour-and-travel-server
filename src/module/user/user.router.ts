import { NextFunction, Request, Response, Router } from 'express'
import { userController } from './user.controller'
import { UserValidation } from './userValidation'

const userRouter = Router()

userRouter.post('/create-user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log({ body: req.body });
        const parsedBody = await UserValidation.userValidationSchema.parseAsync(req.body)
        req.body = parsedBody
        console.log({ parsedBody });
        next()
    } catch (error) {
        next(error)
    }
}, userController.createUser)
userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.updateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/', userController.getUser)

export default userRouter
