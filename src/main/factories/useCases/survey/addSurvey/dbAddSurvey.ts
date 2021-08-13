import { DbAddSurvey } from '@/data/useCases/survey/addSurvey/dbAddSurvey'
import { AddSurvey } from '@/domain/useCases/survey/addSurvey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
