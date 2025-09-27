// src/application/BarrioService.ts
import { AppDataSource } from "../infraestructure/config/database.js";
import { Barrio } from "../infraestructure/entities/Barrio.js";

// Definimos un "tipo" para la estructura de la respuesta, para que el código sea más claro.
type BarrioInfo = {
    nombre: string;
    indiceSeguridad: number;
} | null;

//Clase que encapsula la lógica de negocio relacionada con los barrios
export class BarrioService {
    // Obtenemos el CRUD de la entidad Barrio para poder hacer consultas
    private barrioRepository = AppDataSource.getRepository(Barrio);

    /**
     * Busca un barrio que contenga las coordenadas geográficas proporcionadas.
     * @param cor_sn - Coordenada Sur-Norte (Latitud)
     * @param cor_oo - Coordenada Occidente-Oriente (Longitud)
     * @returns El nombre del barrio y su índice de seguridad, o null si no se encuentra.
     */
    async findBarrioByCoordenadas(cor_sn: number, cor_oo: number): Promise<BarrioInfo> {
        
        // Usamos el "Query Builder" de TypeORM para construir la consulta compleja.
        const barrio = await this.barrioRepository.createQueryBuilder("barrio")
            .where(":cor_sn BETWEEN barrio.cor_sur AND barrio.cor_nor", { cor_sn })
            .andWhere(":cor_oo BETWEEN barrio.cor_occ AND barrio.cor_ori", { cor_oo })
            .getOne(); // .getOne() porque esperamos encontrar un solo barrio

        if (!barrio) {
            return null; // No se encontró ningún barrio en esas coordenadas
        }

        // Devolvemos solo los datos que nos interesan
        return {
            nombre: barrio.nam_bar,
            indiceSeguridad: barrio.ind_seg
        };
    }
}