import { LogErrorRepository } from '@/data/protocols/db/log/logErrorRepository'

export class LogErrorRepositoryStub implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    return Promise.resolve()
  }
}
