import { mockAccountModel, mockAddAccountParams, throwError } from '@/domain/test'
import { AddAccountRepositoryStub, HasherStub, LoadAccountByEmailRepositoryStub } from '@/data/test'
import { DbAddAccount } from './dbAddAccount'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: HasherStub
  addAccountRepositoryStub: AddAccountRepositoryStub
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepositoryStub
}

const makeSut = (): SutTypes => {
  const hasherStub = new HasherStub()
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
  jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValue(new Promise(resolve => resolve(null)))
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')

    const accountData = mockAddAccountParams()
    await sut.add(accountData)

    expect(hashSpy).toHaveBeenCalledWith(accountData.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError)

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub, hasherStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const accountData = mockAddAccountParams()
    await sut.add(accountData)

    expect(addSpy).toHaveBeenCalledWith({ ...accountData, password: hasherStub.hashed })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)

    const promise = sut.add(mockAddAccountParams())

    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const account = await sut.add(mockAddAccountParams())

    expect(account).toEqual(addAccountRepositoryStub.account)
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const accountData = mockAddAccountParams()
    await sut.add(accountData)

    expect(loadSpy).toHaveBeenCalledWith(accountData.email)
  })

  test('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(mockAccountModel())))

    const account = await sut.add(mockAddAccountParams())

    expect(account).toBeNull()
  })
})
