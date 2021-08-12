import { DbLoadSurveys } from '@/data/useCase/loadSurveys/dbLoadSurveys'
import { LoadSurveys } from '@/domain/useCases/loadSurveys'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
