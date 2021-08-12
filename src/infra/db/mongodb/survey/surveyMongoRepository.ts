import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/loadSurveysRepository'
import { AddSurveyModel, AddSurveyRepository } from '../../../../data/useCase/addSurvey/protocols'
import { SurveyModel } from '../../../../domain/models/survey'
import { MongoHelper } from '../helpers/mongoHelper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return surveys.map(survey => MongoHelper.map(survey))
  }
}
