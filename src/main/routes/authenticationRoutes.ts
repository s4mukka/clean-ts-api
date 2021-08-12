import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express/expressRouteAdapter'
import { makeSignUpController } from '@/main/factories/controllers/authentication/signup/signup'
import { makeLoginController } from '@/main/factories/controllers/authentication/login/login'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
