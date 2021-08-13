import { DbLoadSurveys } from '@/data/useCases/survey/loadSurveys/dbLoadSurveys'
import { LoadSurveys } from '@/domain/useCases/survey/loadSurveys'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
