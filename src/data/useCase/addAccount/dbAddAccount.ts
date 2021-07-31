import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<any | AccountModel> {
    await this.encrypter.encrypt(account.password)

    return new Promise(resolve => resolve(null))
  }
}
