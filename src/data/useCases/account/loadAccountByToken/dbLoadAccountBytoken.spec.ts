import faker from 'faker'
import { throwError } from '@/domain/test'
import { DecrypterStub, LoadAccountByTokenRepositoryStub } from '@/data/test'
import { DbLoadAccountByToken } from './dbLoadAccountByToken'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterStub: DecrypterStub
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepositoryStub
}

const makeSut = (): SutTypes => {
  const decrypterStub = new DecrypterStub()
  const loadAccountByTokenRepositoryStub = new LoadAccountByTokenRepositoryStub()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)

  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    const token = faker.datatype.uuid()
    const role = faker.name.jobType()
    await sut.load(token, role)
    expect(decryptSpy).toHaveBeenCalledWith(token)
  })

  test('Should return null if Decrypter return null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const token = faker.datatype.uuid()
    const role = faker.name.jobType()
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    const token = faker.datatype.uuid()
    const role = faker.name.jobType()
    await sut.load(token, role)
    expect(loadByTokenSpy).toHaveBeenCalledWith(token, role)
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))
    const token = faker.datatype.uuid()
    const role = faker.name.jobType()
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const token = faker.datatype.uuid()
    const role = faker.name.jobType()
    const account = await sut.load(token, role)
    expect(account).toEqual(loadAccountByTokenRepositoryStub.account)
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(throwError)
    const token = faker.datatype.uuid()
    const role = faker.name.jobType()
    const promise = sut.load(token, role)
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockImplementationOnce(throwError)
    const token = faker.datatype.uuid()
    const role = faker.name.jobType()
    const promise = sut.load(token, role)
    await expect(promise).rejects.toThrow()
  })
})
