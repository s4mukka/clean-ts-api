import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidatorStub } from '@/validation/test'
import { makeLoginValidation } from './loginValidation'

jest.mock('@/validation/validators/validationComposite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorStub()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
