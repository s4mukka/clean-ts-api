import env from '../../config/env'
import { DbAuthentication } from '../../../data/useCase/dbAuthentication/dbAuthentication'
import { BcryptAdapter } from '../../../infra/criptography/bcryptAdapter/bcryptAdapter'
import { JwtAdapter } from '../../../infra/criptography/jwtAdapter/jwtAdapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/accountMongoRepository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/logMongoRepository'
import { LoginController } from '../../../presentation/controllers/login/login'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/logControllerDecorator'
import { makeLoginValidation } from './loginValidation'

export const makeLoginController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(loginController, logMongoRepository)
}
