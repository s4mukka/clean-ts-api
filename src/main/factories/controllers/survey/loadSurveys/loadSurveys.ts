import { LoadSurveysController } from '../../../../../presentation/controllers/survey/loadSurveys/loadSurveys'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/logController'
import { makeDbLoadSurveys } from '../../../useCases/survey/loadSurveys/dbLoadSurveys'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
