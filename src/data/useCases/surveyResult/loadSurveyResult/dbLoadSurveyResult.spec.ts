import faker from 'faker'
import { LoadSurveyResultRepositoryStub } from '@/data/test'
import { DbLoadSurveyResult } from './dbLoadSurveyResult'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)

  return {
    sut,
    loadSurveyResultRepositoryStub
  }
}

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResultRepository with correct surveyId', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    const surveyId = faker.datatype.uuid()
    await sut.load(surveyId)
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(surveyId)
  })
})
