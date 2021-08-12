import { SignUpController } from '@/presentation/controllers/authentication/signup/signup'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/logController'
import { makeDbAddAccount } from '@/main/factories/useCases/account/addAccount/dbAddAccount'
import { makeDbAuthentication } from '@/main/factories/useCases/account/authentication/dbAuthentication'
import { makeSignUpValidation } from './signupValidation'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
