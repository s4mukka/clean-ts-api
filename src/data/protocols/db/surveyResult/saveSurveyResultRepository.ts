import { SurveyResultModel } from '@/domain/models/surveyResult'
import { SaveSurveyResultParams } from '@/domain/useCases/surveyResult/saveSurveyResult'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
