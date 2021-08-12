import { AddSurveyModel } from '@/domain/useCases/addSurvey'

export interface AddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
