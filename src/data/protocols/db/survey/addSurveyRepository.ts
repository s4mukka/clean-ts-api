import { AddSurveyModel } from '@/domain/useCases/survey/addSurvey'

export interface AddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
