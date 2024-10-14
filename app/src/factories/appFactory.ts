import { Controller } from "../controller";
import { Repository } from "../repository";
import { Service } from "../service";

export class AppFactory {
  private static controller: Controller;
  private static service: Service;
  private static repository: Repository

  public static generateDependencies() {
    if(!this.controller) {
      this.repository = new Repository();
      this.service = new Service();
      this.controller = new Controller(this.service)
    }
  }

  public static getController(): Controller {
    return this.controller
  }

  public static getService(): Service {
    return this.service
  }

  public static getRepository(): Repository {
    return this.repository
  }
}