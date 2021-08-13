import { EmailValidator } from '@/validation/protocols/emailValidator'

export class EmailValidatorStub implements EmailValidator {
  isValid (email: string): boolean {
    return true
  }
}
