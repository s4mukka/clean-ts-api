import { AddSurveyModel, AddSurveyRepository } from '../../../../data/useCase/addSurvey/protocols'
import { MongoHelper } from '../helpers/mongoHelper'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
}
