import { Barrio } from "../infraestructure/entities/Barrio.js";

//DTO para la creación de un Barrio.
//Forma de los datos que deben llegar 
//para poder crear un barrio los datos deben estar completos y bien estructurados.

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

//DTO para la actualización de un Barrio.
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

//DTO para buscar un barrio por coordenadas
export interface BarrioPort {

    findBarrioByCoordenadas(cor_sn: number, cor_oo: number): Promise<Barrio | null>;
    // Operaciones CRUD para la entidad Barrio
    getAllBarrios(): Promise<Barrio[]>;
    getBarrioById(id: number): Promise<Barrio | null>;
    createBarrio(data: CreateBarrioDto): Promise<Barrio>;
    updateBarrio(id: number, data: UpdateBarrioDto): Promise<Barrio | null>;
    //Operaciones de eliminación, Devuelve true si fue exitoso
    deleteBarrio(id: number): Promise<boolean>; 
}