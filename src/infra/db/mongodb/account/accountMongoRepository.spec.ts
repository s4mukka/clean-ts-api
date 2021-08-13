import faker from 'faker'
import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongoHelper'
import { AccountMongoRepository } from './accountMongoRepository'
import { mockAddAccountParams } from '@/domain/test'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const accountData = mockAddAccountParams()
      const account = await sut.add(accountData)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(accountData.name)
      expect(account.email).toBe(accountData.email)
      expect(account.password).toBe(accountData.password)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      const accountData = mockAddAccountParams()
      await accountCollection.insertOne(accountData)
      const account = await sut.loadByEmail(accountData.email)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(accountData.name)
      expect(account.email).toBe(accountData.email)
      expect(account.password).toBe(accountData.password)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(faker.internet.email())

      expect(account).toBeNull()
    })
  })

  describe('updateAccessToken', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const { ops: [fakeAccount] } = await accountCollection.insertOne(mockAddAccountParams())
      expect(fakeAccount.accessToken).toBeFalsy()
      const token = faker.datatype.uuid()
      await sut.updateAccessToken(fakeAccount._id, token)
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(token)
    })
  })

  describe('loadByToken()', () => {
    test('Should return an account on loadByToken success without role', async () => {
      const sut = makeSut()
      const accountData = mockAddAccountParams()
      const token = faker.datatype.uuid()
      await accountCollection.insertOne({
        ...accountData,
        accessToken: token
      })
      const account = await sut.loadByToken(token)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(accountData.name)
      expect(account.email).toBe(accountData.email)
      expect(account.password).toBe(accountData.password)
    })

    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      const accountData = mockAddAccountParams()
      const token = faker.datatype.uuid()
      await accountCollection.insertOne({
        ...accountData,
        accessToken: token,
        role: 'admin'
      })
      const account = await sut.loadByToken(token, 'admin')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(accountData.name)
      expect(account.email).toBe(accountData.email)
      expect(account.password).toBe(accountData.password)
    })

    test('Should return an account on loadByToken with invalid role', async () => {
      const sut = makeSut()
      const token = faker.datatype.uuid()
      const accountData = mockAddAccountParams()
      await accountCollection.insertOne({
        ...accountData,
        accessToken: token
      })
      const account = await sut.loadByToken(token, 'admin')

      expect(account).toBeFalsy()
    })

    test('Should return an account on loadByToken if user is admin', async () => {
      const sut = makeSut()
      const accountData = mockAddAccountParams()
      const token = faker.datatype.uuid()
      await accountCollection.insertOne({
        ...accountData,
        accessToken: token,
        role: 'admin'
      })
      const account = await sut.loadByToken(token)

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(accountData.name)
      expect(account.email).toBe(accountData.email)
      expect(account.password).toBe(accountData.password)
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const token = faker.datatype.uuid()
      const account = await sut.loadByToken(token)

      expect(account).toBeNull()
    })
  })
})
