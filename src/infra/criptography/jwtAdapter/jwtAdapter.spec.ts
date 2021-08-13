import jwt from 'jsonwebtoken'
import faker from 'faker'
import { JwtAdapter } from './jwtAdapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => resolve('any_token'))
  },
  async verify (): Promise<string> {
    return new Promise(resolve => resolve('any_value'))
  }
}))

type SutTypes = {
  sut: JwtAdapter
  secret: string
}

const makeSut = (): SutTypes => {
  const secret = faker.random.word()
  const sut = new JwtAdapter(secret)

  return {
    sut,
    secret
  }
}

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const { sut, secret } = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      const id = faker.datatype.uuid()
      await sut.encrypt(id)
      expect(signSpy).toHaveBeenCalledWith({ id }, secret)
    })

    test('Should return a token on sign success', async () => {
      const { sut } = makeSut()
      const accessToken = await sut.encrypt(faker.datatype.uuid())
      expect(accessToken).toBe('any_token')
    })

    test('Should throw if sign throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = sut.encrypt(faker.datatype.uuid())

      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('Should call verify with correct values', async () => {
      const { sut, secret } = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      const token = faker.datatype.uuid()
      await sut.decrypt(token)
      expect(verifySpy).toHaveBeenCalledWith(token, secret)
    })

    test('Should return a value on verify success', async () => {
      const { sut } = makeSut()
      const token = faker.datatype.uuid()
      const value = await sut.decrypt(token)
      expect(value).toBe('any_value')
    })

    test('Should throw if verify throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })
      const token = faker.datatype.uuid()
      const promise = sut.decrypt(token)
      await expect(promise).rejects.toThrow()
    })
  })
})
