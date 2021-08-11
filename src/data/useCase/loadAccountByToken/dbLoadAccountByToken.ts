import { LoadAccountByToken } from '../../../domain/useCases/loadAccountByToken'
import { Decrypter } from '../../protocols/criptography/Decrypter'
import { AccountModel } from '../addAccount/protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
