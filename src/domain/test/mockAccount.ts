import faker from 'faker'
import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/useCases/account/addAccount'
import { AuthenticationParams } from '@/domain/useCases/account/authentication'

export const mockAccountModel = (): AccountModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAddAccountParams = (): AddAccountParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
