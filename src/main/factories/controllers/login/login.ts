import { LoginController } from '../../../../presentation/controllers/login/login'
import { Controller } from '../../../../presentation/protocols'
import { makeLoginValidation } from './loginValidation'
import { makeDbAuthentication } from '../../useCases/authentication/dbAuthentication'
import { makeLogControllerDecorator } from '../../decorators/logController'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
