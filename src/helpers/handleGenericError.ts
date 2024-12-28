/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const handleGenericError = (err: any, res: Response) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
        error: err
    })
}