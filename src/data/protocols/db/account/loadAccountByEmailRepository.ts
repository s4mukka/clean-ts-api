import { AccountModel } from '@/data/useCase/addAccount/protocols'

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel>
}
