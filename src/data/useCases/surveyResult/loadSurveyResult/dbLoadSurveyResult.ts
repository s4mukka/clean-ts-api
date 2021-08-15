import { LoadSurveyResultRepository } from '@/data/protocols/db/surveyResult/loadSurveyResultRepository'
import { SurveyResultModel } from '@/domain/models/surveyResult'
import { LoadSurveyResult } from '@/domain/useCases/surveyResult/loadSurveyResult'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return null
  }
}
