import { LoadSurveysRepository } from '@/data/protocols/db/survey/loadSurveysRepository'
import { AddSurveyModel, AddSurveyRepository } from '@/data/useCases/addSurvey/protocols'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyById } from '@/domain/useCases/loadSurveyById'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongoHelper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyById {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray()
    return MongoHelper.mapList(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: id })
    return survey && MongoHelper.map(survey)
  }
}
