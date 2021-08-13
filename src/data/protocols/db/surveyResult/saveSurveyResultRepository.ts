import { SurveyResultModel } from '@/domain/models/surveyResult'
import { SaveSurveyResultModel } from '@/domain/useCases/surveyResult/saveSurveyResult'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
