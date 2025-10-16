// Ubicación: src/infraestructure/controller/BarrioController.ts

import { Request, Response } from "express";
import { BarrioService } from "../../application/BarrioService.js";
import { BarrioAdapter } from "../adapter/BarrioAdapter.js";

export class BarrioController {
    private readonly barrioService: BarrioService;

    constructor() {
        this.barrioService = new BarrioService(new BarrioAdapter());
    }

   
    async buscarBarrio(req: Request, res: Response): Promise<Response> {
    try {
      const cor_sn_str = req.query.cor_sn as string;
      const cor_oo_str = req.query.cor_oo as string;

      if (!cor_sn_str || !cor_oo_str) {
        return res.status(400).json({ error: "Faltan las coordenadas cor_sn y/o cor_oo." });
      }

      const cor_sn = parseFloat(cor_sn_str);
      const cor_oo = parseFloat(cor_oo_str);

      if (isNaN(cor_sn) || isNaN(cor_oo)) {
        return res.status(400).json({ error: "Las coordenadas deben ser números válidos." });
      }

      const barrioInfo = await this.barrioService.findBarrioByCoordenadas(cor_sn, cor_oo);

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

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const barrios = await this.barrioService.getAllBarrios();
            return res.status(200).json(barrios);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

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

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const newBarrio = await this.barrioService.createBarrio(req.body);
            return res.status(201).json(newBarrio);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

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

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: "ID inválido." });

            const success = await this.barrioService.deleteBarrio(id);
            if (!success) return res.status(404).json({ error: "Barrio no encontrado." });
            
            return res.status(204).send(); // 204: Éxito, sin contenido que devolver
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}