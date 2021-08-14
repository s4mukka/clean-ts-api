import { SurveyResultModel } from '@/domain/models/surveyResult'
import { SaveSurveyResultParams } from '@/domain/useCases/surveyResult/saveSurveyResult'
import { SaveSurveyResultRepository } from '@/data/protocols/db/surveyResult/saveSurveyResultRepository'
import { mockSurveyResultModel } from '@/domain/test/mockSurveyResult'

export class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
  surveyResult: SurveyResultModel = mockSurveyResultModel()
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    return Promise.resolve(this.surveyResult)
  }
}
