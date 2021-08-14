import MockDate from 'mockdate'
import faker from 'faker'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/httpHelper'
import { throwError } from '@/domain/test'
import { LoadSurveyByIdStub, SaveSurveyResultStub } from '@/presentation/test'
import { HttpRequest } from './protocols'
import { SaveSurveyResultController } from './saveSurveyResult'

const mockRequest = (answer: string = null): HttpRequest => ({
  params: {
    surveyId: faker.datatype.uuid()
  },
  body: {
    answer
  },
  accountId: faker.datatype.uuid()
})

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyByIdStub
  saveSurveyResultStub: SaveSurveyResultStub
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = new LoadSurveyByIdStub()
  const saveSurveyResultStub = new SaveSurveyResultStub()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)

  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub
  }
}

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should calls LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadByIdSpy).toHaveBeenCalledWith(httpRequest.params.surveyId)
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockRequest()
    httpRequest.body.answer = 'wrong_answer'
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should calls SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub, loadSurveyByIdStub } = makeSut()
    const saveIdSpy = jest.spyOn(saveSurveyResultStub, 'save')
    const httpRequest = mockRequest(loadSurveyByIdStub.survey.answers[0].answer)
    await sut.handle(httpRequest)
    expect(saveIdSpy).toHaveBeenCalledWith({
      surveyId: httpRequest.params.surveyId,
      accountId: httpRequest.accountId,
      date: new Date(),
      answer: httpRequest.body.answer
    })
  })

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub, loadSurveyByIdStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest(loadSurveyByIdStub.survey.answers[0].answer))
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut, loadSurveyByIdStub, saveSurveyResultStub } = makeSut()
    const httpResponse = await sut.handle(mockRequest(loadSurveyByIdStub.survey.answers[0].answer))
    expect(httpResponse).toEqual(ok(saveSurveyResultStub.surveyResult))
  })
})
