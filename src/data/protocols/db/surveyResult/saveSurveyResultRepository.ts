import { SaveSurveyResultParams } from '@/domain/useCases/surveyResult/saveSurveyResult'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<void>
}
