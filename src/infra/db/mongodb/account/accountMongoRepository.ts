import { AddAccountRepository } from '@/data/protocols/db/account/addAccountRepository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/loadAccountByEmailRepository'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/loadAccountByTokenRepository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/updateAccessTokenRepository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/useCases/account/addAccount'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongoHelper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })

    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })

    return account && MongoHelper.map(account)
  }
}
