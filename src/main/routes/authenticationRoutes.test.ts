import request from 'supertest'
import faker from 'faker'
import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongoHelper'
import app from '@/main/config/app'

let accountCollection: Collection

describe('Authentication Routes', () => {
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

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      const password = faker.internet.password()
      await request(app)
        .post('/api/signup')
        .send({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: password,
          passwordConfirmation: password
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const email = faker.internet.email()
      const password = faker.internet.password()
      await accountCollection.insertOne({
        name: faker.name.findName(),
        email: email,
        password: await hash(password, 12)
      })

      await request(app)
        .post('/api/login')
        .send({
          email: email,
          password: password
        })
        .expect(200)
    })

    test('Should return 401 with invalid credentials', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: faker.internet.email(),
          password: faker.internet.password()
        })
        .expect(401)
    })
  })
})
