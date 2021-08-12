import { adaptMiddleware } from '../adapters/express/expressMiddlewareAdapter'
import { makeAuthMiddleware } from '../factories/middlewares/authMiddleware'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
