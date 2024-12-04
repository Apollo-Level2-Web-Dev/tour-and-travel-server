import express, { Request, Response } from 'express'
import userRouter from './module/user/user.router'
import tourRouter from './module/tour/tour.route'

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

export default app
