import express from "express";
import userRoutes from "./infraestructure/routes/user.routes.js";
import barrioRoutes from "./infraestructure/routes/BarrioRoutes.js";
class App {
    app;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express.json());
    }
    routes() {
        this.app.get("/", (req, res) => res.send("API funcionando correctamente ✅"));
        // Módulo Users
        this.app.use("/api/users", userRoutes);
        // Módulo Barrios
        this.app.use("/api/barrios", barrioRoutes);
    }
    getApp() {
        return this.app;
    }
}
export default new App().getApp();
//# sourceMappingURL=app.js.map