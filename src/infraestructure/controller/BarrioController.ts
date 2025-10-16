import { Request, Response } from "express";
import { BarrioService } from "../../application/BarrioService.js";
import { BarrioAdapter } from "../adapter/BarrioAdapter.js";

export class BarrioController {
  private barrioService: BarrioService;

  constructor() {
    const barrioAdapter = new BarrioAdapter();
    this.barrioService = new BarrioService(barrioAdapter);
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
      console.error("Error en buscarBarrio:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  }
}
