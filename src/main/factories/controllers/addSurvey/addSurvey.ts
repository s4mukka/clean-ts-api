import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/logController'
import { AddSurveyController } from '../../../../presentation/controllers/survey/addSurvey'
import { makeAddSurveyValidation } from './addSurveyValidation'
import { makeDbAddSurvey } from '../../useCases/addSurvey/dbAddSurvey'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
