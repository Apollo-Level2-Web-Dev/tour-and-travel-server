/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import handlerCastError from './handlerCastError'
import handlerGenericError from './handlerGenericError'
import GenericError from '../../classes/errorClasses/GenericError'
import { ZodError } from 'zod'
import handlerZodError from './handleZodError'
import { TErrorResponse } from '../../types/TErrorResponse'
import handleValidationError from './handleValidationError'
import handlerDuplicateError from './handlerDuplicateError'

const errorPreproccesor = (err: any): TErrorResponse => {
    if (err instanceof ZodError) {
        return handlerZodError(err)
    } else if (err instanceof mongoose.Error.ValidationError) {
        return handleValidationError(err)
    } else if (err.code && err.code === 11000) {
        return handlerDuplicateError(err)
    } else if (err instanceof mongoose.Error.CastError) {
        return handlerCastError(err)
    } else if (err instanceof GenericError) {
        return handlerGenericError(err)
    } else {
        return {
            statusCode: 500,
            status: 'error',
            message: 'Unknown Error',
            issues: [
                {
                    path: '',
                    message: err.message,
                },
            ],
        }
        // errorResponse = handlerGenericError(err)
    }
}

export default errorPreproccesor