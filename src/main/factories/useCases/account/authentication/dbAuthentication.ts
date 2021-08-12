import { DbAuthentication } from '@/data/useCase/dbAuthentication/dbAuthentication'
import { BcryptAdapter } from '@/infra/criptography/bcryptAdapter/bcryptAdapter'
import { JwtAdapter } from '@/infra/criptography/jwtAdapter/jwtAdapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/accountMongoRepository'
import env from '@/main/config/env'

export const makeDbAuthentication = (): DbAuthentication => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)

  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
}
