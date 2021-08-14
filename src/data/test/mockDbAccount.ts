import faker from 'faker'
import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/useCases/account/addAccount'
import { mockAccountModel } from '@/domain/test'
import { AddAccountRepository } from '@/data/protocols/db/account/addAccountRepository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/loadAccountByEmailRepository'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/loadAccountByTokenRepository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/updateAccessTokenRepository'

export class AddAccountRepositoryStub implements AddAccountRepository {
  account: AccountModel
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const account: AccountModel = { id: faker.datatype.uuid(), ...accountData }
    this.account = account
    return Promise.resolve(account)
  }
}

export class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
  account: AccountModel = mockAccountModel()
  async loadByEmail (email: string): Promise<AccountModel> {
    return Promise.resolve(this.account)
  }
}

export class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
  account: AccountModel = mockAccountModel()
  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    return Promise.resolve(this.account)
  }
}

export class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
  async updateAccessToken (id: string, token: string): Promise<void> {
    return Promise.resolve()
  }
}
