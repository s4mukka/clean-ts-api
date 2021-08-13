import { AccountModel } from '@/data/useCases/addAccount/protocols'

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel>
}
