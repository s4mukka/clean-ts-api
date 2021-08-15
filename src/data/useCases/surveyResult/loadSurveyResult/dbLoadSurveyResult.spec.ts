import faker from 'faker'
import { LoadSurveyByIdRepositoryStub, LoadSurveyResultRepositoryStub } from '@/data/test'
import { throwError } from '@/domain/test'
import { SurveyResultModel } from './protocols'
import { DbLoadSurveyResult } from './dbLoadSurveyResult'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepositoryStub
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
  const loadSurveyByIdRepositoryStub = new LoadSurveyByIdRepositoryStub()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub)

  return {
    sut,
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub
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

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    const surveyId = faker.datatype.uuid()
    await sut.load(surveyId)
    expect(loadByIdSpy).toHaveBeenCalledWith(surveyId)
  })

  test('Should return SurveyResultModel with all answers count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null))
    const surveyId = faker.datatype.uuid()
    const surveyResult = await sut.load(surveyId)
    const survey = loadSurveyByIdRepositoryStub.survey
    const surveyResultExpect: SurveyResultModel = {
      surveyId: survey.id,
      question: survey.question,
      date: survey.date,
      answers: survey.answers.map(answer => ({ ...answer, count: 0, percent: 0 }))
    }
    expect(surveyResult).toEqual(surveyResultExpect)
  })

  test('Should return SurveyResultModel on success', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const surveyResult = await sut.load(faker.datatype.uuid())
    expect(surveyResult).toEqual(loadSurveyResultRepositoryStub.surveyResult)
  })
})
