import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'
import { ok } from '@/presentation/helpers/http/httpHelper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class ControllerStub implements Controller {
  account: AccountModel = mockAccountModel()
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve(ok(this.account)))
  }
}
