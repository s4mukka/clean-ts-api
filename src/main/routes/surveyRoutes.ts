import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express/expressMiddlewareAdapter'
import { adaptRoute } from '../adapters/express/expressRouteAdapter'
import { makeAddSurveyController } from '../factories/controllers/survey/addSurvey/addSurvey'
import { makeAuthMiddleware } from '../factories/middlewares/authMiddleware'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
