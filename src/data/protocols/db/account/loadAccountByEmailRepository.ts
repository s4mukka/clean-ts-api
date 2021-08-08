import { AccountModel } from '../../useCase/addAccount/protocols'

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel>
}
