import { SignUpController } from '../../../../presentation/controllers/authentication/signup/signup'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/logController'
import { makeDbAddAccount } from '../../useCases/addAccount/dbAddAccount'
import { makeDbAuthentication } from '../../useCases/authentication/dbAuthentication'
import { makeSignUpValidation } from './signupValidation'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
