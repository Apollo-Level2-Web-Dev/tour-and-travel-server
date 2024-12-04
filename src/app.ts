import express, { NextFunction, Request, Response } from 'express'
import userRouter from './module/user/user.router'
import tourRouter from './module/tour/tour.route'
import { StatusCodes } from 'http-status-codes'

const app = express()

// middleware
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/tour', tourRouter)

// POST: /api/user/create-user

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  console.log('error from app.ts', err)
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: err.message, error: err })
})

export default app
