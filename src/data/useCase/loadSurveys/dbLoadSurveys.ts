import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveys } from '../../../domain/useCases/loadSurveys'
import { LoadSurveysRepository } from '../../protocols/db/survey/loadSurveysRepository'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveysRepository: LoadSurveysRepository
  ) {}

  async load (): Promise<SurveyModel[]> {
    await this.loadSurveysRepository.loadAll()
    return null
  }
}
