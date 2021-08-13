import { AddAccountModel } from '@/domain/useCases/account/addAccount'
import { AccountModel } from '@/domain/models/account'

export interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
