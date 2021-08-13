import MockDate from 'mockdate'
import faker from 'faker'
import { throwError } from '@/domain/test'
import { LoadSurveyByIdRepositoryStub } from '@/data/test'
import { DbLoadSurveyById } from './DbLoadSurveyById'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = new LoadSurveyByIdRepositoryStub()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)

  return {
    sut,
    loadSurveyByIdRepositoryStub
  }
}

describe('DbLoadSurveyById UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyByIdRepository with correct value', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    const id = faker.datatype.uuid()
    await sut.loadById(id)
    expect(loadByIdSpy).toHaveBeenCalledWith(id)
  })

  test('Should return a survey on success', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const survey = await sut.loadById(faker.datatype.uuid())
    expect(survey).toEqual(loadSurveyByIdRepositoryStub.survey)
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById(faker.datatype.uuid())
    await expect(promise).rejects.toThrow()
  })
})
