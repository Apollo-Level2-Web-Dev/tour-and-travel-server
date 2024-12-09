import { ZodError } from 'zod'
import { TErrorIssue, TErrorResponse } from '../../types/TErrorResponse'

const handlerZodError = (err: ZodError): TErrorResponse => {
    const issues: TErrorIssue[] = err.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        }
    })

    return {
        statusCode: 400,
        status: 'error',
        message: 'Validation Error',
        issues,
    }
}

export default handlerZodError