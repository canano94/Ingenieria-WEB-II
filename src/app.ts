// src/web/app.ts

import express, { type Request, type Response } from "express";
// Importamos nuestro servicio que contiene la lógica de negocio para los barrios.
import { BarrioService } from "./application/BarrioService.js";

class App {
  private app: express.Application;
  // Guardamos una instancia del servicio para usarla en las rutas.
  private barrioService: BarrioService;

  constructor() {
    this.app = express();
    this.barrioService = new BarrioService();
    this.routes();
  }
  /**
   * Método privado para configurar todas las rutas de la API.
   */
  private routes(): void {
    this.app.get("/", (request: Request, response: Response) => {
      response.send("Hola Mundo");
    });
    
    /**
     * Endpoint para buscar un barrio por coordenadas.
     * Recibe latitud (cor_sn) y longitud (cor_oo) como query parameters.
     */
    this.app.get("/barrios/buscar", async (request: Request, response: Response) => {
        try {
            const cor_sn_str = request.query.cor_sn as string;
            const cor_oo_str = request.query.cor_oo as string;

            if (!cor_sn_str || !cor_oo_str) {
                return response.status(400).json({ error: "Faltan las coordenadas cor_sn y/o cor_oo." });
            }
            // Convertimos los parámetros de texto a números.
            const cor_sn = parseFloat(cor_sn_str);
            const cor_oo = parseFloat(cor_oo_str);

            if (isNaN(cor_sn) || isNaN(cor_oo)) {
                return response.status(400).json({ error: "Las coordenadas deben ser números válidos." });
            }
            // Usamos el servicio para ejecutar la lógica de búsqueda.
            const barrioInfo = await this.barrioService.findBarrioByCoordenadas(cor_sn, cor_oo);

            if (barrioInfo) {
                return response.status(200).json(barrioInfo);
            } else {
                return response.status(404).json({ error: "No se encontró ningún barrio en las coordenadas proporcionadas." });
            }

        } catch (error) {
            console.error("Error en la búsqueda de barrio:", error);
            return response.status(500).json({ error: "Error interno del servidor." });
        }
    });
  }
  // Método público que devuelve la instancia de la aplicación Express.
  getApp() {
    return this.app;
  }
}
// Exportamos una única instancia de la aplicación ya configurada.
export default new App().getApp();