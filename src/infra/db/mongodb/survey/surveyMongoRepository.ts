import { ObjectId } from 'mongodb'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/loadSurveysRepository'
import { AddSurveyParams, AddSurveyRepository } from '@/data/useCases/survey/addSurvey/protocols'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveyById } from '@/domain/useCases/survey/loadSurveyById'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongoHelper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyById {
  async add (surveyData: AddSurveyParams): Promise<void> {
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
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
