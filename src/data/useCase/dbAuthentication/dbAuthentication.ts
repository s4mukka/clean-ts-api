import { Authentication, AuthenticationModel } from '../../../domain/useCases/authentication'
import { HashComparer } from '../../protocols/criptography/hashComparer'
import { TokenGenerator } from '../../protocols/criptography/tokenGenerator'
import { LoadAccountByEmailRepository } from '../../protocols/db/loadAccountByEmailRepository'
import { UpdateAccessTokenRepository } from '../../protocols/db/updateAccessTokenRepository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)

      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)

        await this.updateAccessTokenRepository.update(account.id, accessToken)

        return accessToken
      }
    }

    return null
  }
}
