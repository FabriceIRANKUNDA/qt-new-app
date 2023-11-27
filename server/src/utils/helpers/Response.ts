import { Response } from 'express'
import { Document } from 'mongoose'
class ResponseHandler {
  static successMessage(
    res: Response,
    message: string,
    data: Document<unknown> | Document<unknown>[] = null,
    status: number,
  ) {
    res.status(status).json(
      data
        ? {
            status: status,
            message,
            data: data,
          }
        : {
            status: status,
            message,
          },
    )
  }

  static errorMessage(res: Response, error: any, status: number) {
    res.status(status).json({
      status: status,
      error,
    })
  }
}

export default ResponseHandler
