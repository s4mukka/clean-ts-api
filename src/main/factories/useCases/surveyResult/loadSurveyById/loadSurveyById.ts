import { DbLoadSurveyById } from '@/data/useCases/survey/loadSurveyById/DbLoadSurveyById'
import { LoadSurveyById } from '@/domain/useCases/survey/loadSurveyById'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveyMongoRepository)
}
