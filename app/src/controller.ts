import { Request, Response } from "express";
import { Service } from "./service";

export class Controller {
  private readonly service: Service

  constructor (_service: Service) {
    this.service = _service
  }

  public async sellTicket(request: Request, response: Response) {
    const payload = request.body;
    try {
      await this.service.sellTicket(payload);
    } catch (error: any) {
        if(error.message === "No ticket enough") {
          response.status(400).send();
          return
        }
        if(error.message === "TicketId exist") {
          response.status(409).send();
          return
        }
      response.status(500).send();
      return
    }
    
    response.status(202).json();
    
    return
  }
}