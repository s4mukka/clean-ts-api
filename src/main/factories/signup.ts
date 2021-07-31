import { DbAddAccount } from '../../data/useCase/addAccount/dbAddAccount'
import { BcryptAdapter } from '../../infra/criptography/bcryptAdapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/accountRepository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/emailValidatorAdapter'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, accountMongoRepository)

  return new SignUpController(emailValidatorAdapter, addAccount)
}
