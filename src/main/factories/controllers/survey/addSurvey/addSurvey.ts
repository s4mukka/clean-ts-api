import { Controller } from '@/presentation/protocols'
import { AddSurveyController } from '@/presentation/controllers/survey/addSurvey/addSurvey'
import { makeLogControllerDecorator } from '@/main/factories/decorators/logController'
import { makeDbAddSurvey } from '@/main/factories/useCases/survey/addSurvey/dbAddSurvey'
import { makeAddSurveyValidation } from './addSurveyValidation'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
