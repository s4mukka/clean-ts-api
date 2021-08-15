import { DbSaveSurveyResult } from '@/data/useCases/surveyResult/saveSurveyResult/dbSaveSurveyResult'
import { SaveSurveyResult } from '@/domain/useCases/surveyResult/saveSurveyResult'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/surveyResult/surveyResultMongoRepository'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
