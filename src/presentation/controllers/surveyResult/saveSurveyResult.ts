import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http/httpHelper'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadSurveyById.loadById(httpRequest.params.surveyId)
      return forbidden(new InvalidParamError('surveyId'))
    } catch (error) {
      return serverError(error)
    }
  }
}
