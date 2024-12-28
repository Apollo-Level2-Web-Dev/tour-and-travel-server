/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express"
import { StatusCodes } from "http-status-codes"

export const handlerDuplicateError = (err: any, res: Response) => {
    res.status(StatusCodes.CONFLICT).json({
        status: false,
        message: err.message,
        error: err
    })
} 