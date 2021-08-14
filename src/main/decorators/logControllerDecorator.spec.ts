import faker from 'faker'
import { LogErrorRepositoryStub } from '@/data/test'
import { ok, serverError } from '@/presentation/helpers/http/httpHelper'
import { HttpRequest, HttpResponse } from '@/presentation/protocols'
import { ControllerStub } from '@/main/test'
import { LogControllerDecorator } from './logControllerDecorator'

const mockServerError = (stack): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = stack

  return serverError(fakeError)
}

const mockRequest = (): HttpRequest => {
  const password = faker.internet.password()
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: password,
      passwordConfirmation: password
    }
  }
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: ControllerStub
  logErrorRepositoryStub: LogErrorRepositoryStub
}

const makeSut = (): SutTypes => {
  const controllerStub = new ControllerStub()
  const logErrorRepositoryStub = new LogErrorRepositoryStub()

  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller handle', async () => {
    const { sut, controllerStub } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ok(controllerStub.account))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    const stack = faker.random.words()
    const serverError = mockServerError(stack)
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(serverError))

    await sut.handle(mockRequest())

    expect(logSpy).toHaveBeenCalledWith(stack)
  })
})
