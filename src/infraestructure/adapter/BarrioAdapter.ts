// src/infraestructure/adapter/BarrioAdapter.ts
import { AppDataSource } from "../config/database.js";
import { Barrio } from "../entities/Barrio.js";
import { BarrioPort } from "../../domain/BarrioPort.js";

export class BarrioAdapter implements BarrioPort {
    private barrioRepository = AppDataSource.getRepository(Barrio);

    async findBarrioByCoordenadas(cor_sn: number, cor_oo: number): Promise<Barrio | null> {
        return await this.barrioRepository
            .createQueryBuilder("barrio")
            // --- ¡AQUÍ ESTÁ LA MAGIA! ---
            // Unimos la tabla 'barrio' con su relación 'coordenadas'.
            // "barrio.coordenadas" se refiere a la propiedad en tu entidad Barrio.
            // "coordenadas" es el alias que le damos a la tabla unida.
            .innerJoinAndSelect("barrio.coordenadas", "coordenadas")
            // Ahora usamos el alias "coordenadas" para acceder a las columnas.
            .where(":cor_sn BETWEEN coordenadas.cor_sur AND coordenadas.cor_nor", { cor_sn })
            .andWhere(":cor_oo BETWEEN coordenadas.cor_occ AND coordenadas.cor_ori", { cor_oo })
            .getOne();
    }
}