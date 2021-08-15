import { DbLoadSurveyResult } from '@/data/useCases/surveyResult/loadSurveyResult/dbLoadSurveyResult'
import { LoadSurveyResult } from '@/domain/useCases/surveyResult/loadSurveyResult'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/surveyMongoRepository'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/surveyResult/surveyResultMongoRepository'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
