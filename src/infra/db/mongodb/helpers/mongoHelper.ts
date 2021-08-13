import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,

  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await (this.client as MongoClient).close()
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client || !(this.client as MongoClient).isConnected()) {
      await this.connect(this.url)
    }

    return (this.client as MongoClient).db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection

    return {
      id: _id,
      ...collectionWithoutId
    }
  },

  mapList (collection: any[]): any[] {
    return collection.map(coll => MongoHelper.map(coll))
  }
}
