import { Response } from "express";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleCastError = (err: any, res: Response) => {
    res.status(400).json({
        success: false,
        message: err.message,
        error: err
    })
}