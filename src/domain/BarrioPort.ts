import { Barrio } from "../infraestructure/entities/Barrio.js";

export interface BarrioPort {
  findBarrioByCoordenadas(cor_sn: number, cor_oo: number): Promise<Barrio | null>;
}
