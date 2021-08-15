import { SurveyResultModel } from '@/domain/models/surveyResult'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string) => Promise<SurveyResultModel>
}
