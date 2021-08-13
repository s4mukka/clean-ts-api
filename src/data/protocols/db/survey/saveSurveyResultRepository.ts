import { SurveyResultModel } from '@/domain/models/surveyResult'
import { SaveSurveyResultModel } from '@/domain/useCases/saveSurveyResult'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
