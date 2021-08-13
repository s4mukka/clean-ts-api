import { DbAddAccount } from '@/data/useCases/account/addAccount/dbAddAccount'
import { AddAccount } from '@/domain/useCases/account/addAccount'
import { BcryptAdapter } from '@/infra/criptography/bcryptAdapter/bcryptAdapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/accountMongoRepository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(hasher, accountMongoRepository, accountMongoRepository)
}
