import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/logController'
import { AddSurveyController } from '../../../../../presentation/controllers/survey/addSurvey/addSurvey'
import { makeAddSurveyValidation } from './addSurveyValidation'
import { makeDbAddSurvey } from '../../../useCases/survey/addSurvey/dbAddSurvey'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
