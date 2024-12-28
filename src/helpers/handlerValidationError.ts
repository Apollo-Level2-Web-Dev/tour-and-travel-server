import { Response } from "express";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleValidationError = (err: any, res: Response) => {
    const issues = Object.values(err.errors).map((item: any) => {
        return {
            name: item.name,
            path: item.path,
            message: item.message
        }
    });

    res.status(400).json({
        success: false,
        message: err.message,
        issues: issues,
        error: err
    })

}