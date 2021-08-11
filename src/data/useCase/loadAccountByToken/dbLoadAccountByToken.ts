import { LoadAccountByToken } from '../../../domain/useCases/loadAccountByToken'
import { Decrypter } from '../../protocols/criptography/Decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/loadAccountByTokenRepository'
import { AccountModel } from '../addAccount/protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    return null
  }
}
