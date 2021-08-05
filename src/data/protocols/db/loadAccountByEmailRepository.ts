import { AccountModel } from '../../useCase/addAccount/protocols'

export interface LoadAccountByEmailRepository {
  load: (email: string) => Promise<AccountModel>
}
