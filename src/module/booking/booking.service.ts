/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import Booking from './booking.model'
import Tour from '../tour/tour.model'
import { IBooking } from './booking.interface'

// const createBookingWithoutTransaction = async (
//   bookingData: IBooking,
// ): Promise<IBooking> => {
//   const booking = await Booking.create(bookingData)

//   if (!booking) {
//     throw new Error('Booking failed')
//   }

//   //   throw new Error('Booking failed fake error')
//   const tour = await Tour.findByIdAndUpdate(
//     booking.tour,
//     // {
//     //   $inc: { availableSeats: -booking.bookedSlots },
//     // },
//     {
//       availableSeats: { $inc: -booking.bookedSlots },
//     },
//   )
//   if (!tour) {
//     throw new Error('Booking failed')
//   }

//   return booking
// }

//with transaction
///transaction makes a replica set / clone of the entire database
// it runs the database operations in a isolated environment
// if all operation is successful then it commits the transaction. means it keeps the clone databse to main database
// if any operation fails then it aborts the transaction. means it deletes the clone database
const createBooking = async (bookingData: IBooking): Promise<IBooking> => {
    //initiate the isolated environment. that is the mongodb session/ mongoose session
    const session = await mongoose.startSession()
    //session is the isolated environment


    //start the database operation in isolated environment
    session.startTransaction()

    try {
        //array of object sent
        const booking = await Booking.create([bookingData], { session })

        //so booking is an array of object with one object
        if (!booking) {
            throw new Error('Booking failed')
        }

        // throw new Error('Booking failed fake error')
        const tour = await Tour.findByIdAndUpdate(
            booking[0].tour,
            //   {
            //     $inc: { availableSeats: -booking[0].bookedSlots },
            //   },
            {
                availableSeats: { $inc: -booking[0].bookedSlots },
            },

            {
                session,
                // new: true,
                // runValidators: true,
            },
        )
        if (!tour) {
            throw new Error('Tour Update in booking failed')
        }

        await session.commitTransaction()
        //replica set / clone is saved to main database
        await session.endSession()
        //isolated environment is closed

        return booking[0]
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error(error)
    }
}

const getAllBookings = async (): Promise<IBooking[]> => {
    const result = await Booking.find()
    return result
}

const getSingleBooking = async (id: string): Promise<IBooking | null> => {
    const result = await Booking.findById(id)
    return result
}
const getAllBookingsOfAUser = async (id: string): Promise<IBooking[]> => {
    const result = await Booking.find({
        user: id,
    })
    return result
}

const updateBooking = async (
    id: string,
    bookingData: IBooking,
): Promise<IBooking | null> => {
    //apply transaction here
    //if bookedSlots decreases, then increase availableSeats in tour
    //if bookedSlots increases, then decrease availableSeats in tour
    const result = await Booking.findByIdAndUpdate(id, bookingData, {
        new: true,
        runValidators: true,
    })

    return result
}

const deleteBooking = async (id: string): Promise<IBooking | null> => {
    const result = await Booking.findByIdAndDelete(id)
    return result
}

export const bookingServices = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    getAllBookingsOfAUser,
    updateBooking,
    deleteBooking,
}