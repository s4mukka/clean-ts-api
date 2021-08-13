import { SurveyResultModel } from '@/domain/models/surveyResult'

export type AddSurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResult {
  save: (data: AddSurveyResultModel) => Promise<SurveyResultModel>
}
