import { AccountModel } from '@/data/useCases/addAccount/protocols'

export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<AccountModel>
}
