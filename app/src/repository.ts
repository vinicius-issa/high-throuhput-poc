import { MongoDBConnection } from "./db";

export interface Ticket {
  userId: string;
  eventId: string;
  ticketNumber: number;
}

export class Repository {
  private collectionName = "my-collection";

  private async getCollection() {
    const db = await MongoDBConnection.getClient();
    return db.collection(this.collectionName);
  }

  public async countTickets(): Promise<number> {
    const collection = await this.getCollection();
    return collection.countDocuments();
  }

  public async insertTicket(ticket: Ticket): Promise<void> {
    const collection = await this.getCollection();
    await collection.insertOne(ticket);
  }

  public async existTicket(ticketNumber: number): Promise<boolean> {
    const collection = await this.getCollection();
    const ticket = await collection.findOne({ ticketNumber });
    return ticket !== null;
  }
}
