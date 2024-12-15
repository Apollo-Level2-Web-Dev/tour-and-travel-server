import { Response } from 'express'

type TSuccessResponse<T> = {
  status?: boolean
  statusCode: number
  message: string
  token?:string
  data: T | T[] | null
}

const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).json({
    status: true,
    statusCode: data.statusCode,
    message: data.message,
    token:data.token,
    data: data.data,
  })
}

export default sendResponse
