import { loginPath, signUpPath, surveysPath, surveyResultPath } from './paths'
import { badRequest, serverError, unauthorized, forbidden } from './components'
import {
  apiKeyAuthSchema,
  accountSchema,
  loginParamsSchema,
  signUpParamsSchema,
  errorSchema,
  surveySchema,
  surveysSchema,
  surveyAnswerSchema,
  addSurveyParamsSchema,
  saveSurveyResultParamsSchema,
  surveyResultSchema
} from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API do curso do Mango para realizar enquetes entre progamadores',
    version: '1.0.0'
  },
  servers: [
    {
      url: '/api'
    }
  ],
  tags: [
    {
      name: 'Authentication'
    },
    {
      name: 'Survey'
    }
  ],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveysPath,
    '/surveys/{surveyId}/results': surveyResultPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema,
    addSurveyParams: addSurveyParamsSchema,
    saveSurveyResultParams: saveSurveyResultParamsSchema,
    surveyResult: surveyResultSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    forbidden
  }
}
