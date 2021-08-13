import { Request, Response } from 'express'
import { Controller, HttpRequest } from '@/presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      accountId: req.accountId
    }

    const { statusCode, body } = await controller.handle(httpRequest)

    if (statusCode >= 200 && statusCode <= 299) {
      return res.status(statusCode).json(body)
    }

    return res.status(statusCode).json({
      error: body.message
    })
  }
}
