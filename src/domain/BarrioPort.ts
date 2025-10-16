// Ubicación: src/domain/BarrioPort.ts

import { Barrio } from "../infraestructure/entities/Barrio.js";


export interface CreateBarrioDto {
    nam_bar: string;
    ind_seg: number;
    porcentaje?: string;
    coordenadas: {
        cor_sur: number;
        cor_nor: number;
        cor_ori: number;
        cor_occ: number;
    };
}


export interface UpdateBarrioDto {
    nam_bar?: string;
    ind_seg?: number;
    porcentaje?: string;
    coordenadas?: {
        cor_sur?: number;
        cor_nor?: number;
        cor_ori?: number;
        cor_occ?: number;
    };
}


export interface BarrioPort {

    findBarrioByCoordenadas(cor_sn: number, cor_oo: number): Promise<Barrio | null>;
    getAllBarrios(): Promise<Barrio[]>;
    getBarrioById(id: number): Promise<Barrio | null>;
    createBarrio(data: CreateBarrioDto): Promise<Barrio>;
    updateBarrio(id: number, data: UpdateBarrioDto): Promise<Barrio | null>;
    deleteBarrio(id: number): Promise<boolean>; // Devuelve true si fue exitoso
}