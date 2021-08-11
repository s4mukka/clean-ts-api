
import { DbLoadAccountByToken } from '../../../../../data/useCase/loadAccountByToken/dbLoadAccountByToken'
import { LoadAccountByToken } from '../../../../../domain/useCases/loadAccountByToken'
import { JwtAdapter } from '../../../../../infra/criptography/jwtAdapter/jwtAdapter'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/accountMongoRepository'
import env from '../../../../config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
