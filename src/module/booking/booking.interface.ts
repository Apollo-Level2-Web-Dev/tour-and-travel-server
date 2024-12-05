/**
 * user - id
 * tour - id
 * 
 * bookedSlots
 * 
 * bookingStatus
 * 
 * 
 * 
 */

import mongoose from "mongoose";

/**
 * 
 * Bus - Dhaka - Coxs Bazar
 * 30 seat
 * 
 * 1 -> 4 tickets
 * 
 * 30 seat - 4 tickets = 26
 * 
 * 30 - 4 = 26
 * 26 + 4 = 30
 * 
 */

export interface IBooking {
    user : mongoose.Schema.Types.ObjectId
    tour : mongoose.Schema.Types.ObjectId
    bookedSlots : number
    bookingStatus: 'pending' | 'paid' | 'cancelled'
    totalPrice : number
}