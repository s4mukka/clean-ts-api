import { AccountModel } from '@/data/useCases/account/addAccount/protocols'

export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<AccountModel>
}
