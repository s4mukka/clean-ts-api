import { LogErrorRepository } from '@/data/protocols/db/log/logErrorRepository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongoHelper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
