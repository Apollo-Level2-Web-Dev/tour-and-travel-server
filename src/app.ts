
import express, { Request, Response } from 'express'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import bookingRouter from './module/booking/booking.route'
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


app.use(globalErrorHandler)

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found'
  })
})

export default app

// req, res > jwt funtion next() > function 
// express -> workflow = 
// train -> [router]-[controller -error]-[service - error]-[errorHandler]->