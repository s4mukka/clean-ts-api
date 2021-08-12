import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express/expressMiddlewareAdapter'
import { adaptRoute } from '../adapters/express/expressRouteAdapter'
import { makeAddSurveyController } from '../factories/controllers/survey/addSurvey/addSurvey'
import { makeLoadSurveysController } from '../factories/controllers/survey/loadSurveys/loadSurveys'
import { makeAuthMiddleware } from '../factories/middlewares/authMiddleware'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware())
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
