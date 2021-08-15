import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/expressRouteAdapter'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/surveyResult/saveSurveyResult/saveSurveyResult'
import { makeLoadSurveyResultController } from '@/main/factories/controllers/surveyResult/loadSurveyResult/loadSurveyResult'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
