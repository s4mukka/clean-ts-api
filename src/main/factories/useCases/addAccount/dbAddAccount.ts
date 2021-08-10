import { BcryptAdapter } from '../../../../infra/criptography/bcryptAdapter/bcryptAdapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/accountMongoRepository'
import { AddAccount } from '../../../../domain/useCases/addAccount'
import { DbAddAccount } from '../../../../data/useCase/addAccount/dbAddAccount'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(hasher, accountMongoRepository)
}
