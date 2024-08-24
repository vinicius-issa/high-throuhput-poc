import { Repository, Ticket } from "./repository";

export class Service {
  private readonly repository: Repository
  private readonly limit: number
  
  constructor(_repository: Repository) {
    this.repository = new Repository()
    this.limit = Number(process.env.PUBLIC_LIMIT) || 20_000;
  }

  private generateTicketNumber () {
    return Math.floor(Math.random() * 1000)
  }

  public async sellTicket(ticket: { userId: string, eventId: string }): Promise<Ticket> {
    const totalSold = await this.repository.countTickets()
    if(totalSold >= this.limit) {
      throw new Error("No ticket enough")
    }
    const ticketNumber = `#${this.generateTicketNumber()}`
    const ticketSelled = {
      ...ticket,
      ticketNumber,
    };

    await this.repository.insertTicket(ticketSelled);
    return ticketSelled;
  }
}