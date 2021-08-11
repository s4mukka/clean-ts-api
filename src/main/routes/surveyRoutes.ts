import { Router } from 'express'
import { adaptRoute } from '../adapters/express/expressRouteAdapter'
import { makeAddSurveyController } from '../factories/controllers/survey/addSurvey/addSurvey'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeAddSurveyController()))
}
