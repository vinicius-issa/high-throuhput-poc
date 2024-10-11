import { Repository, Ticket } from "./repository";

export class Service {
  private readonly repository: Repository
  private readonly limit: number
  
  constructor(_repository: Repository) {
    this.repository = new Repository()
    this.limit = Number(process.env.PUBLIC_LIMIT) || 20_000;
  }

  private async sleep (ms: number) {
    new Promise(resolve => setTimeout(resolve, ms))
  } 

  private async generateTicketNumber (): Promise<number> {
    await this.sleep(500)
    return Math.floor(Math.random() * 1_000_000)
  }

  public async sellTicket(ticket: { userId: string, eventId: string }): Promise<Ticket> {
    const totalSold = await this.repository.countTickets()
    if(totalSold >= this.limit) {
      throw new Error("No ticket enough")
    }
    const ticketNumber = await this.generateTicketNumber()

    const existTicket = await this.repository.existTicket(ticketNumber)
    if(existTicket) {
      throw new Error("TicketId exist")
    }

    const ticketSelled = {
      ...ticket,
      ticketNumber,
    };

    await this.repository.insertTicket(ticketSelled);
    return ticketSelled;
  }
}