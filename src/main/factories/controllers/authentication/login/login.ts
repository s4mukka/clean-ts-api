import { LoginController } from '@/presentation/controllers/authentication/login/login'
import { Controller } from '@/presentation/protocols'
import { makeDbAuthentication } from '@/main/factories/useCases/account/authentication/dbAuthentication'
import { makeLogControllerDecorator } from '@/main/factories/decorators/logController'
import { makeLoginValidation } from './loginValidation'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
