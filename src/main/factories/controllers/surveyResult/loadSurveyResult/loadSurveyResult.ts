import { Controller } from '@/presentation/protocols'
import { LoadSurveyResultController } from '@/presentation/controllers/surveyResult/loadSurveyResult/loadSurveyResult'
import { makeLogControllerDecorator } from '@/main/factories/decorators/logController'
import { makeDbLoadSurveyById } from '@/main/factories/useCases/survey/loadSurveyById/loadSurveyById'
import { makeDbLoadSurveyResult } from '@/main/factories/useCases/surveyResult/loadSurveyResult/loadSurveyResult'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
