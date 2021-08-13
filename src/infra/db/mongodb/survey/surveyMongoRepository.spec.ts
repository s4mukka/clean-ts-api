import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongoHelper'
import { SurveyMongoRepository } from './surveyMongoRepository'
import { mockAddSurveyParams } from '@/domain/test'

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

let surveyCollection: Collection

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a survey on add success', async () => {
      const sut = makeSut()
      const surveyParams = mockAddSurveyParams()
      await sut.add(surveyParams)

      const survey = await surveyCollection.findOne(surveyParams)

      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const firstSurvey = mockAddSurveyParams()
      const secondSurvey = mockAddSurveyParams()
      await surveyCollection.insertMany([
        firstSurvey,
        secondSurvey
      ])
      const sut = makeSut()
      const surveys = await sut.loadAll()

      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(firstSurvey.question)
      expect(surveys[1].id).toBeTruthy()
      expect(surveys[1].question).toBe(secondSurvey.question)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()

      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const surveyParams = mockAddSurveyParams()
      const res = await surveyCollection.insertOne(surveyParams)
      const id = res.ops[0]._id as string
      const sut = makeSut()
      const survey = await sut.loadById(id)

      expect(survey).toBeTruthy()
      expect(survey.id).toEqual(id)
      expect(survey.question).toBe(surveyParams.question)
    })
  })
})
