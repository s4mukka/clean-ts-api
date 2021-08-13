import { AccountModel } from '@/data/useCases/account/addAccount/protocols'

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel>
}
