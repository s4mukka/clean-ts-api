import { SurveyResultModel } from '@/domain/models/surveyResult'

export interface LoadSurveyResult {
  load: (surveyId: string) => Promise<SurveyResultModel>
}
