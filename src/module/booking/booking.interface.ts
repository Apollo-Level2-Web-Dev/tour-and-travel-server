import mongoose from 'mongoose'

export interface IBooking {
    user: mongoose.Schema.Types.ObjectId
    tour: mongoose.Schema.Types.ObjectId
    bookedSlots: number
    price: number
    bookingStatus: 'pending' | 'paid' | 'cancelled'
}