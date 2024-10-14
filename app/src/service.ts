import { RedisClientType } from "redis";
import { Repository, Ticket } from "./repository";
import { RedisRepository } from "./redisRepository";

export class Service {
  private readonly repository: Repository;
  private readonly limit: number;
  private readonly redis: RedisRepository;

  constructor() {
    this.repository = new Repository();
    this.limit = Number(process.env.PUBLIC_LIMIT) || 20_000;
    this.redis = new RedisRepository();
  }

  private async sleep(ms: number) {
    new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async generateTicketNumber(): Promise<number> {
    await this.sleep(500);
    return Math.floor(Math.random() * 1_000_000);
  }

  private async validateTicketLimit(): Promise<void> {
    const totalSold = await this.redis.getTotal();
    if (totalSold >= this.limit) {
      throw new Error("No ticket enough");
    }
  }

  public async sellTicket(ticket: {
    userId: string;
    eventId: string;
  }): Promise<Ticket> {
    await this.validateTicketLimit();
    
    await this.sleep(500) //some expensive validation
    
    const ticketNumber = await this.generateTicketNumber();
    
    const existTicket = await this.redis.getTicket(ticketNumber);
    if (existTicket) {
      throw new Error("TicketId exist");
      }
      
      
      await this.redis.addOne();
      await this.validateTicketLimit();
      const ticketSelled = {
        ...ticket,
        ticketNumber,
        };
      
    await this.redis.addTicket(ticketSelled);
    await this.repository.insertTicket(ticketSelled);

    return ticketSelled;
  }
}
