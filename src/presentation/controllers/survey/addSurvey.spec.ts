import { HttpRequest, Validation } from './protocols'
import { badRequest } from '../../helpers/http/httpHelper'
import { AddSurveyController } from './addSurvey'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answer: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  validationStub: Validation
  sut: AddSurveyController

}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AddSurveyController(validationStub)

  return {
    validationStub,
    sut
  }
}

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})