/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express'
import config from '../config'
import errorPreproccesor from '../helpers/errorHelpers/errorPreprocessor'
import { TErrorResponse } from '../types/TErrorResponse'

/* eslint-disable @typescript-eslint/no-explicit-any */
const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // let statusCode = err.statusCode || 500
    // let message =
    // let status = err.status || 'error'

    let errorResponse: TErrorResponse = {
        //Fallback error response
        statusCode: err.statusCode || 500,
        status: err.status || 'error',
        message: err.message || 'Something went wrong',
        issues: err.issues || [],
    }

    console.log(err)

    errorResponse = errorPreproccesor(err)
    // Sob error er Baap hocche JS Error Class

    res.status(errorResponse.statusCode).json({
        status: errorResponse.status,
        message: errorResponse.message,
        issues: errorResponse.issues,
        //only in NODE_ENV=development
        stack: config.node_env === 'development' ? err.stack : undefined,
        error: err,
    })
}

export default globalErrorHandler

//Error Pattern
// statusCode
//status
//message
//issues