import { StatusCodes } from "http-status-codes"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { BookingService } from "./booking.service"

const createBooking = catchAsync(async (req, res) => {
    const body = req.body
    const result = await BookingService.createBooking(body)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Booking created successfully',
        data: result,
    })
})

export const bookingController = {
    createBooking
}