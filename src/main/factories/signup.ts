import { DbAddAccount } from '../../data/useCase/addAccount/dbAddAccount'
import { BcryptAdapter } from '../../infra/criptography/bcryptAdapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/accountRepository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/logRepository/log'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/emailValidatorAdapter'
import { LogControllerDecorator } from '../decorators/log'
import { makeSignUpValidation } from './signupValidation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, addAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
