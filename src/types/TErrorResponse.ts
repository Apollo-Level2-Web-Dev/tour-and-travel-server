export type TErrorResponse = {
    statusCode: number
    status: 'error' | 'fail'
    message: string
    issues: TErrorIssue[]
}

export type TErrorIssue = {
    path: string | number
    message: string
}