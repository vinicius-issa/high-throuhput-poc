import { Application } from "express";
import { AppFactory } from "../factories/appFactory";

export const addRoutes = (app: Application) => {
  app.get("/", (req, res) => {
    res.send("Hello World")
  })

  addSellTicketRoute(app);
}

const addSellTicketRoute = (app: Application) => {
  const controller = AppFactory.getController();

  app.post('/api/sell', (req, res) => {
    return controller.sellTicket(req, res);
  })
}