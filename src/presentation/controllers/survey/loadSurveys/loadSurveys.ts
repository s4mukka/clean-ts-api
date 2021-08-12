import { ok } from '../../../helpers/http/httpHelper'
import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()
    return ok(surveys)
  }
}
