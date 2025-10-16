import express, { Request, Response } from "express";
import userRoutes from "./infraestructure/routes/userroutes.js";
import barrioRoutes from "./infraestructure/routes/BarrioRoutes.js";
import favoriteRouter from './infraestructure/routes/FavoriteRoutes.js';

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.get("/", (req: Request, res: Response) => res.send("API funcionando correctamente ✅"));

    // Módulo Users
    this.app.use("/api/users", userRoutes);

    // Módulo Barrios
    this.app.use("/api/barrios", barrioRoutes);

    // Módulo Favoritos
    this.app.use("/api/favorites", favoriteRouter);
  }

  getApp() {
    return this.app;
  }
}

export default new App().getApp();
