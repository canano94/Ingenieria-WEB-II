import { BarrioPort } from "../domain/BarrioPort.js";

type BarrioInfo = {
  nombre: string;
  indiceSeguridad: number;
} | null;

export class BarrioService {
  constructor(private barrioPort: BarrioPort) {}

  async findBarrioByCoordenadas(cor_sn: number, cor_oo: number): Promise<BarrioInfo> {
    const barrio = await this.barrioPort.findBarrioByCoordenadas(cor_sn, cor_oo);

    if (!barrio) return null;

    return {
      nombre: barrio.nam_bar,
      indiceSeguridad: barrio.ind_seg
    };
  }
}
