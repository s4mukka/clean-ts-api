import { DbAddAccount } from '../../../data/useCase/addAccount/dbAddAccount'
import { BcryptAdapter } from '../../../infra/criptography/bcryptAdapter/bcryptAdapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/accountMongoRepository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/logMongoRepository'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/logControllerDecorator'
import { makeSignUpValidation } from './signupValidation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(hasher, accountMongoRepository)
  const signUpController = new SignUpController(addAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
