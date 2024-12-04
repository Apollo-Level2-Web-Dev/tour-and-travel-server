/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { bookingController } from './booking.controller'

const router = express.Router()

router.post('/create-booking', bookingController.createBooking)
router.get('/', bookingController.getAllBookings)
router.get('/:id', bookingController.getSingleBooking)
router.patch('/:id', bookingController.updateBooking)
router.get('/:userId/get-all-bookings', bookingController.getAllBookingsOfAUser)
router.delete('/:id', bookingController.deleteBooking)

export const bookingRouter = router