import { SurveyResultModel } from '@/domain/models/surveyResult'
import { mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResult } from '@/domain/useCases/surveyResult/loadSurveyResult'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/useCases/surveyResult/saveSurveyResult'

export class SaveSurveyResultStub implements SaveSurveyResult {
  surveyResult: SurveyResultModel = null
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.surveyResult = mockSurveyResultModel()
    return Promise.resolve(this.surveyResult)
  }
}

export class LoadSurveyResultStub implements LoadSurveyResult {
  surveyResult: SurveyResultModel = null
  async load (surveyId: string): Promise<SurveyResultModel> {
    this.surveyResult = mockSurveyResultModel()
    return Promise.resolve(this.surveyResult)
  }
}
