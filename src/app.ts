import express, { type Request, type Response } from "express";

//Endpoints - Routes
class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.routes();
  }
  private routes(): void {
    this.app.get("/", (request: Request, response: Response) => {
      response.send("Hola Mundo");
    });
    this.app.get("/check", (request: Request, response: Response) => {
      response.send("Check");
    });
    this.app.get("/Test", (request: Request, response: Response) => {
      response.send("This is a Test");
    });

    this.app.get("/nodemon", (request: Request, response: Response) => {
      response.send("This is a Test with nodemon");
    });
  }
  getApp(){
    return this.app;
  }
}

export default new App().getApp();
