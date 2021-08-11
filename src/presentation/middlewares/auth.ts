import { LoadAccountByToken } from '../../domain/useCases/loadAccountByToken'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/httpHelper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }
    const error = forbidden(new AccessDeniedError())
    return new Promise(resolve => resolve(error))
  }
}
