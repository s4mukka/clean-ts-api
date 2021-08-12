import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/expressRouteAdapter'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/addSurvey/addSurvey'
import { makeLoadSurveysController } from '@/main/factories/controllers/survey/loadSurveys/loadSurveys'
import { adminAuth, auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
