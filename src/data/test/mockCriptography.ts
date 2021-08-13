import faker from 'faker'
import { Decrypter } from '@/data/protocols/criptography/Decrypter'
import { Encrypter } from '@/data/protocols/criptography/Encrypter'
import { HashComparer } from '@/data/protocols/criptography/hashComparer'
import { Hasher } from '@/data/protocols/criptography/hasher'

export class HasherStub implements Hasher {
  hashed: string = faker.datatype.uuid()
  async hash (value: string): Promise<string> {
    return new Promise(resolve => resolve(this.hashed))
  }
}

export class DecrypterStub implements Decrypter {
  value: string = faker.datatype.uuid()
  async decrypt (value: string): Promise<string> {
    return new Promise(resolve => resolve(this.value))
  }
}
export class HashComparerStub implements HashComparer {
  async compare (value: string, hash: string): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}

export class EncrypterStub implements Encrypter {
  token: string = faker.datatype.uuid()
  async encrypt (id: string): Promise<string> {
    return new Promise(resolve => resolve(this.token))
  }
}
