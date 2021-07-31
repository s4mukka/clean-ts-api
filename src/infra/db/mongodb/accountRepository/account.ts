import { AddAccountRepository } from '../../../../data/protocols/addAccountRepository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/useCases/addAccount'
import MongoHelper from '../helpers/mongoHelper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel | any> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const { _id, ...accountWhithoutId } = result.ops[0]

    return {
      id: _id,
      ...accountWhithoutId
    }
  }
}
