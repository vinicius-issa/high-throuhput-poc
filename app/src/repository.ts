import { MongoDBConnection } from "./db";

export interface Ticket {
  userId: string;
  eventId: string;
  ticketNumber: string;
}

export class Repository {
  private collectionName = 'my-collection'

  private async getCollection() {
    const db = await MongoDBConnection.getClient();
    return db.collection(this.collectionName)
  }

  public async countTickets(): Promise<number> {
    const collection = await this.getCollection()
    return collection.countDocuments()
  }

  public async insertTicket(ticket: Ticket): Promise<void> {
    const collection = await this.getCollection()
    await collection.insertOne(ticket)
  }
}