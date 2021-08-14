import { AddSurveyParams } from '@/domain/useCases/survey/addSurvey'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyRepository } from '@/data/protocols/db/survey/addSurveyRepository'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/loadSurveyByIdRepository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/loadSurveysRepository'
import { mockSurveyModel, mockSurveysModel } from '@/domain/test'

export class AddSurveyRepositoryStub implements AddSurveyRepository {
  async add (data: AddSurveyParams): Promise<void> {
    return Promise.resolve(null)
  }
}

export class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
  survey: SurveyModel = mockSurveyModel()
  async loadById (id: string): Promise<SurveyModel> {
    return Promise.resolve(this.survey)
  }
}
export class LoadSurveysRepositoryStub implements LoadSurveysRepository {
  surveys: SurveyModel[] = mockSurveysModel()
  async loadAll (): Promise<SurveyModel[]> {
    return Promise.resolve(this.surveys)
  }
}
