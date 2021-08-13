import faker from 'faker'
import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from './requiredFieldValidation'

type SutTypes = {
  sut: RequiredFieldValidation
  field: string
}

const makeSut = (): SutTypes => {
  const field = faker.random.word()
  const sut = new RequiredFieldValidation(field)

  return {
    sut,
    field
  }
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const { sut, field } = makeSut()
    const error = sut.validate({ anyField: faker.random.words() })

    expect(error).toEqual(new MissingParamError(field))
  })

  test('Should not return if validation succeeds', () => {
    const { sut, field } = makeSut()
    const input = {}
    input[field] = faker.random.words()
    const error = sut.validate(input)

    expect(error).toBeFalsy()
  })
})
