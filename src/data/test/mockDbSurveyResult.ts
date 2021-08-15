import { SurveyResultModel } from '@/domain/models/surveyResult'
import { SaveSurveyResultParams } from '@/domain/useCases/surveyResult/saveSurveyResult'
import { mockSurveyResultModel } from '@/domain/test/mockSurveyResult'
import { SaveSurveyResultRepository } from '@/data/protocols/db/surveyResult/saveSurveyResultRepository'
import { LoadSurveyResultRepository } from '@/data/protocols/db/surveyResult/loadSurveyResultRepository'

export class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<void> {
    return Promise.resolve()
  }
}

export class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
  surveyResult: SurveyResultModel = mockSurveyResultModel()
  async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
    return Promise.resolve(this.surveyResult)
  }
}
