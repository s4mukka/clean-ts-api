import bcrypt from 'bcrypt'
import faker from 'faker'
import { BcryptAdapter } from './bcryptAdapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hash_value')
  },
  async compare (): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')

      const value = faker.internet.password()
      await sut.hash(value)

      expect(hashSpy).toHaveBeenCalledWith(value, salt)
    })

    test('Should return a valid hash on hash success', async () => {
      const sut = makeSut()

      const hash = await sut.hash(faker.internet.password())

      expect(hash).toBe('hash_value')
    })

    test('Should throw a if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.hash(faker.internet.password())

      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    test('Should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')

      const value = faker.internet.password()
      const hash = faker.datatype.uuid()
      await sut.compare(value, hash)

      expect(compareSpy).toHaveBeenCalledWith(value, hash)
    })

    test('Should return true when compare succeeds', async () => {
      const sut = makeSut()

      const value = faker.internet.password()
      const hash = faker.datatype.uuid()
      const isValid = await sut.compare(value, hash)

      expect(isValid).toBe(true)
    })

    test('Should return false when compare fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => Promise.resolve(false))
      const value = faker.internet.password()
      const hash = faker.datatype.uuid()
      const isValid = await sut.compare(value, hash)

      expect(isValid).toBe(false)
    })

    test('Should throw a if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => { throw new Error() })
      const value = faker.internet.password()
      const hash = faker.datatype.uuid()
      const promise = sut.compare(value, hash)

      await expect(promise).rejects.toThrow()
    })
  })
})
