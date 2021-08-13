import { AddSurveyParams } from '@/domain/useCases/survey/addSurvey'

export interface AddSurveyRepository {
  add: (data: AddSurveyParams) => Promise<void>
}
