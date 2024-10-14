import RedisClient from "@redis/client/dist/lib/client";
import { RedisConnection } from "./redis";
import { RedisClientType } from "redis";
import { Ticket } from "./repository";

export class RedisRepository {
  client: RedisClientType | undefined
  key: string = 'total'

  constructor() { 
    RedisConnection.getClient().then((_client) => {
      this.client = _client;
    })
  }

  async getTicket(ticketNumber: number): Promise<Ticket | null> {
    const ticket = await this.client?.get(`${ticketNumber}`)
    return ticket && JSON.parse(ticket);
  }

  async addTicket(ticket: Ticket) {
    await this.client?.set(`${ticket.ticketNumber}`, JSON.stringify(ticket))
  }

  async getTotal(): Promise<number> {
    const total = await this.client?.get(this.key)
    return total ? Number(total) : 0;
  }

  async addOne() {
    await this.client?.incr(this.key);
  }
}