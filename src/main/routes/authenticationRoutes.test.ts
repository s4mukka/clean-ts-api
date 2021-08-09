import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongoHelper'
import app from '../config/app'

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
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Samuel',
          email: 'samuel.pereira@catijr.com.br',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      await accountCollection.insertOne({
        name: 'Samuel',
        email: 'samuel.pereira@catijr.com.br',
        password: await hash('123', 12)
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'samuel.pereira@catijr.com.br',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 with invalid credentials', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'samuel.pereira@catijr.com.br',
          password: '123'
        })
        .expect(401)
    })
  })
})