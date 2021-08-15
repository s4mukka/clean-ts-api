import { InvalidParamError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers/http/httpHelper'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { surveyId } = httpRequest.params
    await this.loadSurveyById.loadById(surveyId)
    return forbidden(new InvalidParamError('surveyId'))
  }
}
