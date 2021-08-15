import MockDate from 'mockdate'
import { throwError, mockSurveyResultParams } from '@/domain/test'
import { LoadSurveyResultRepositoryStub, SaveSurveyResultRepositoryStub } from '@/data/test'
import { DbSaveSurveyResult } from './dbSaveSurveyResult'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepositoryStub
  loadSurveyResultRepositoryStub: LoadSurveyResultRepositoryStub
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = new SaveSurveyResultRepositoryStub()
  const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub)

  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const surveyResultParams = mockSurveyResultParams()
    await sut.save(surveyResultParams)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultParams)
  })

  test('Should throws if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSurveyResultParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    const surveyResultParams = mockSurveyResultParams()
    await sut.save(surveyResultParams)
    expect(loadBySurveyIdpy).toHaveBeenCalledWith(surveyResultParams.surveyId)
  })

  test('Should throws if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.save(mockSurveyResultParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyResult on success', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const surveyResult = await sut.save(mockSurveyResultParams())
    expect(surveyResult).toEqual(loadSurveyResultRepositoryStub.surveyResult)
  })
})
