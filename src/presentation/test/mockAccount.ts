import faker from 'faker'
import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/useCases/account/addAccount'
import { Authentication, AuthenticationParams } from '@/domain/useCases/account/authentication'
import { LoadAccountByToken } from '@/domain/useCases/account/loadAccountByToken'

export class AddAccountStub implements AddAccount {
  account: AccountModel = mockAccountModel()
  async add (account: AddAccountParams): Promise<AccountModel> {
    return new Promise(resolve => resolve(this.account))
  }
}

export class AuthenticationStub implements Authentication {
  token: string = null
  async auth (authentication: AuthenticationParams): Promise<string> {
    this.token = faker.datatype.uuid()
    return new Promise(resolve => resolve(this.token))
  }
}

export class LoadAccountByTokenStub implements LoadAccountByToken {
  account: AccountModel = mockAccountModel()
  async load (accessToken: string): Promise<AccountModel> {
    return new Promise(resolve => resolve(this.account))
  }
}
