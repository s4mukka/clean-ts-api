import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository
} from './protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<any | AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)

    await this.loadAccountByEmailRepositoryStub.loadByEmail(accountData.email)

    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    })

    return new Promise(resolve => resolve(account))
  }
}
