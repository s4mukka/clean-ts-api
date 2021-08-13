import { SurveyResultModel } from '@/domain/models/surveyResult'
import { mockSurveyResultModel } from '@/domain/test'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/useCases/surveyResult/saveSurveyResult'

export class SaveSurveyResultStub implements SaveSurveyResult {
  surveyResult: SurveyResultModel = null
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.surveyResult = mockSurveyResultModel()
    return new Promise(resolve => resolve(this.surveyResult))
  }
}
