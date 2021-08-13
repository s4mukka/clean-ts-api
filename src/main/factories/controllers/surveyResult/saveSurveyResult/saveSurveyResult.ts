import { makeLogControllerDecorator } from '@/main/factories/decorators/logController'
import { makeDbLoadSurveyById } from '@/main/factories/useCases/surveyResult/loadSurveyById/loadSurveyById'
import { makeDbSaveSurveyResult } from '@/main/factories/useCases/surveyResult/saveSurveyResult/saveSurveyResult'
import { SaveSurveyResultController } from '@/presentation/controllers/surveyResult/saveSurveyResult'
import { Controller } from '@/presentation/protocols'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
