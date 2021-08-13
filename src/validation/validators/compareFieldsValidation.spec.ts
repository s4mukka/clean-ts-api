import faker from 'faker'
import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from './compareFieldsValidation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFields Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: faker.random.word(),
      fieldToCompare: faker.lorem.word()
    })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const value = faker.random.word()
    const error = sut.validate({
      field: value,
      fieldToCompare: value
    })

    expect(error).toBeFalsy()
  })
})
