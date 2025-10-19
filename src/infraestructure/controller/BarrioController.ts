import { Request, Response } from "express";
import { BarrioService } from "../../application/BarrioService.js";
import { BarrioAdapter } from "../adapter/BarrioAdapter.js";

// Controlador para manejar las solicitudes relacionadas con los barrios
export class BarrioController {
    private readonly barrioService: BarrioService;
    
    // En el constructor, creamos una instancia del servicio que vamos a usar.
    // Esta es una forma de inyección de dependencias manual.
    constructor() {
        this.barrioService = new BarrioService(new BarrioAdapter());
    }

    // Maneja la petición para el endpoint GET /buscar.
    async buscarBarrio(req: Request, res: Response): Promise<Response> {
    try {
      // Extraemos las coordenadas de la query
      const cor_sn_str = req.query.cor_sn as string;
      const cor_oo_str = req.query.cor_oo as string;
      // Validamos que las coordenadas estén presentes
      if (!cor_sn_str || !cor_oo_str) {
        return res.status(400).json({ error: "Faltan las coordenadas sur, norte, oriente y occidente." });
      }
      //Convertimos los datos de string a número.
      const cor_sn = parseFloat(cor_sn_str);
      const cor_oo = parseFloat(cor_oo_str);
      // Validamos que las coordenadas sean números válidos
      if (isNaN(cor_sn) || isNaN(cor_oo)) {
        return res.status(400).json({ error: "Las coordenadas deben ser números válidos." });
      }
      //Llamamos al servicio para que haga la lógica de verdad.
      const barrioInfo = await this.barrioService.findBarrioByCoordenadas(cor_sn, cor_oo);
      //Basado en la respuesta del servicio, preparamos la respuesta HTTP.
      if (!barrioInfo) {
        return res.status(404).json({ error: "No se encontró ningún barrio en las coordenadas proporcionadas." });
      }
       return res.status(200).json(barrioInfo);
    } catch (error) {
      {
      console.error("Error en buscarBarrio:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
      }
    }
  }
    // Otros metodos CRUD estandar
    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const barrios = await this.barrioService.getAllBarrios();
            return res.status(200).json(barrios);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    // Meodo para manejar la solicitud de Buscar por id
    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

            const barrio = await this.barrioService.getBarrioById(id);
            if (!barrio) return res.status(404).json({ error: "Barrio no encontrado." });
            
            return res.status(200).json(barrio);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    // Metodo para manejar la solicitud de Crear
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const newBarrio = await this.barrioService.createBarrio(req.body);
            return res.status(201).json(newBarrio);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    // Metodo para manejar la solicitud de Actualizar
    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

            const updatedBarrio = await this.barrioService.updateBarrio(id, req.body);
            if (!updatedBarrio) return res.status(404).json({ error: "Barrio no encontrado." });
            
            return res.status(200).json(updatedBarrio);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    // Metodo para manejar la solicitud de Eliminar
    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

            const success = await this.barrioService.deleteBarrio(id);
            if (!success) return res.status(404).json({ error: "Barrio no encontrado." });
            
            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}