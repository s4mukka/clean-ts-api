import { AddSurvey, AddSurveyParams } from '@/domain/useCases/survey/addSurvey'
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveysModel, mockSurveyModel } from '@/domain/test'
import { LoadSurveys } from '@/domain/useCases/survey/loadSurveys'
import { LoadSurveyById } from '@/domain/useCases/survey/loadSurveyById'

export class AddSurveyStub implements AddSurvey {
  async add (add: AddSurveyParams): Promise<void> {
    return Promise.resolve(null)
  }
}

export class LoadSurveysStub implements LoadSurveys {
  surveys: SurveyModel[] = null
  async load (): Promise<SurveyModel[]> {
    this.surveys = mockSurveysModel()
    return Promise.resolve(this.surveys)
  }
}

export class LoadSurveyByIdStub implements LoadSurveyById {
  survey: SurveyModel = mockSurveyModel()
  async loadById (id: string): Promise<SurveyModel> {
    return Promise.resolve(this.survey)
  }
}
