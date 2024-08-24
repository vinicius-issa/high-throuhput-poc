import { MongoClient, Db} from 'mongodb'

export class MongoDBConnection {
  private static db: Db;

  public static async getClient () {
    if (!this.db) {
      const url = process.env.MONGO_URL ?? '';
      const dbName = 'PocTest';

      const client = new MongoClient(url);
      await client.connect();

      this.db = client.db(dbName);
    }

    return this.db;
  }
}