import mongoose from 'mongoose'
import { TErrorIssue, TErrorResponse } from '../../types/TErrorResponse'

const handlerDuplicateError = (
    err: mongoose.Error.ValidationError,
): TErrorResponse => {
    const regex = /"(.*?)"/
    const matches = err.message.match(regex)
    const issues: TErrorIssue[] = [
        {
            path: '',
            message: `Duplicate value for ${matches![1]}`,
        },
    ]

    return {
        statusCode: 409,
        status: 'error',
        message: 'Duplicate Error',
        issues,
    }
}

export default handlerDuplicateError