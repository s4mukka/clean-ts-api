import { DbAddSurvey } from '../../../../data/useCase/addSurvey/dbAddSurvey'
import { AddSurvey } from '../../../../domain/useCases/addSurvey'
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/surveyMongoRepository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
