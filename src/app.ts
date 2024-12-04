import express, { Request, Response } from 'express'
import { bookingRouter } from './module/booking/booking.route'
import tourRouter from './module/tour/tour.route'
import userRouter from './module/user/user.router'

const app = express()

// middleware
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/tour', tourRouter)
app.use('/api/booking', bookingRouter)

// POST: /api/user/create-user

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

app.use(
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction,
  ) => {
    console.log(err)
    res.status(500).json({
      status: 'fail',
      message: err.message,
    })
  },
)

export default app
