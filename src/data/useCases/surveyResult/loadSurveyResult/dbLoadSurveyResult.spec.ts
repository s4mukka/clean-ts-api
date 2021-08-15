import faker from 'faker'
import { LoadSurveyResultRepositoryStub } from '@/data/test'
import { throwError } from '@/domain/test'
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

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.load(faker.datatype.uuid())
    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyResultModel on success', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const surveyResult = await sut.load(faker.datatype.uuid())
    expect(surveyResult).toEqual(loadSurveyResultRepositoryStub.surveyResult)
  })
})
