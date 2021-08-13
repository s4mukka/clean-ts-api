import faker from 'faker'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/useCases/survey/addSurvey'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(),
  answers: [{
    image: faker.image.image(),
    answer: faker.random.word()
  }, {
    answer: faker.random.word()
  }],
  date: new Date()
})

export const mockSurveysModel = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel()
])

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: faker.random.words(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.random.word()
  }, {
    answer: faker.random.word()
  }],
  date: new Date()
})
