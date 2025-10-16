// ⚠️ reflect-metadata debe ir primero
import "reflect-metadata";
import app from "./app.js";
import { ServerBoostrap } from "./infraestructure/boostrap/server.boostrap.js";
import "./infraestructure/config/environment-vars.js";
import { connectDB } from "./infraestructure/config/database.js";

// Instancia del servidor
const server = new ServerBoostrap(app);

// Función principal
(async () => {
  try {
    await connectDB();
    await server.init();
  } catch (error) {
    console.error("❌ Error starting server:");
    console.error(error instanceof Error ? error.stack : error);
    process.exit(1);
  }
})();
