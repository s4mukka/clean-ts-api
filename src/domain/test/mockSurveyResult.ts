import faker from 'faker'
import { SurveyResultModel } from '@/domain/models/surveyResult'
import { SaveSurveyResultParams } from '@/domain/useCases/surveyResult/saveSurveyResult'

export const mockSurveyResultModel = (): SurveyResultModel => ({
  id: faker.datatype.uuid(),
  accountId: faker.datatype.uuid(),
  surveyId: faker.datatype.uuid(),
  answer: faker.random.word(),
  date: new Date()
})

export const mockSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: faker.datatype.uuid(),
  surveyId: faker.datatype.uuid(),
  answer: faker.random.word(),
  date: new Date()
})
