import { AccountModel } from '@/data/useCase/addAccount/protocols'

export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<AccountModel>
}
