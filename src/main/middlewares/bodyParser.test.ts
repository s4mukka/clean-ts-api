import request from 'supertest'
import faker from 'faker'
import app from '@/main/config/app'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    const name = faker.name.findName()

    await request(app)
      .post('/test_body_parser')
      .send({ name: name })
      .expect({ name: name })
  })
})
