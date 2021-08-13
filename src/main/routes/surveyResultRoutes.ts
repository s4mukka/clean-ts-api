import { Router } from 'express'
import { adaptRoute } from '../adapters/express/expressRouteAdapter'
import { makeSaveSurveyResultController } from '../factories/controllers/surveyResult/saveSurveyResult/saveSurveyResult'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
