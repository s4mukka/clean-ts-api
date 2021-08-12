import { LoadSurveysController } from '@/presentation/controllers/survey/loadSurveys/loadSurveys'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/logController'
import { makeDbLoadSurveys } from '@/main/factories/useCases/survey/loadSurveys/dbLoadSurveys'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
