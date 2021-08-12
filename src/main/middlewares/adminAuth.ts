import { adaptMiddleware } from '@/main/adapters/express/expressMiddlewareAdapter'
import { makeAuthMiddleware } from '@/main/factories/middlewares/authMiddleware'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
