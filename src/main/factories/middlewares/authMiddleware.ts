import { AuthMiddleware } from '../../../presentation/middlewares/auth'
import { Middleware } from '../../../presentation/protocols'
import { makeDbLoadAccountByToken } from '../useCases/account/loadAccountByToken/dbLoadAccountByToken'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
