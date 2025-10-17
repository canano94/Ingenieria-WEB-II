import { Barrio } from "../infraestructure/entities/Barrio.js";
import { BarrioPort, CreateBarrioDto, UpdateBarrioDto } from "../domain/BarrioPort.js";

// Define la estructura del DTO de respuesta para barrios.
export interface BarrioResponseDto {
    id: number;
    nombre: string;
    indiceSeguridad: number;
    porcentaje?: string;
    coordenadas: {
        sur: number;
        norte: number;
        oriente: number;
        occidente: number;
    };
}

// Capa de Aplicación: Lógica de negocio para los Barrios.
export class BarrioService {

    // Constructor para inyectar la dependencia del puerto.
    constructor(private readonly barrioPort: BarrioPort) {}

    // Método privado para transformar la entidad Barrio a nuestro DTO de respuesta.
     
    private mapBarrioToResponse(barrio: Barrio): BarrioResponseDto {
        return {
            id: barrio.id,
            nombre: barrio.nam_bar,
            indiceSeguridad: barrio.ind_seg,
            porcentaje: barrio.porcentaje,
            coordenadas: {
                sur: barrio.coordenadas.cor_sur,
                norte: barrio.coordenadas.cor_nor,
                oriente: barrio.coordenadas.cor_ori,
                occidente: barrio.coordenadas.cor_occ,
            }
        };
    }

    // Realiza la búsqueda de un barrio por coordenadas.
    async findBarrioByCoordenadas(cor_sn: number, cor_oo: number): Promise<BarrioResponseDto | null> {
        const barrio = await this.barrioPort.findBarrioByCoordenadas(cor_sn, cor_oo);
        return barrio ? this.mapBarrioToResponse(barrio) : null;
    }
    // Obtiene datos de todos los barrios.
    async getAllBarrios(): Promise<BarrioResponseDto[]> {
        const barrios = await this.barrioPort.getAllBarrios();
        return barrios.map(this.mapBarrioToResponse);
    }
    //Obtiene los datos de un barrio por su ID.
    async getBarrioById(id: number): Promise<BarrioResponseDto | null> {
        const barrio = await this.barrioPort.getBarrioById(id);
        //Array para mostrar los barrios
        return barrio ? this.mapBarrioToResponse(barrio) : null;
    }
    // Crea un nuevo barrio.
    async createBarrio(data: CreateBarrioDto): Promise<BarrioResponseDto> {
        const newBarrio = await this.barrioPort.createBarrio(data);
        return this.mapBarrioToResponse(newBarrio);
    }
    //Actualizar Barrio
    async updateBarrio(id: number, data: UpdateBarrioDto): Promise<BarrioResponseDto | null> {
        const updatedBarrio = await this.barrioPort.updateBarrio(id, data);
        return updatedBarrio ? this.mapBarrioToResponse(updatedBarrio) : null;
    }
    // Elimina un barrio por su ID (Responsabilidad del port y retorna un booleano indicando éxito o fracaso).
    async deleteBarrio(id: number): Promise<boolean> {
        return this.barrioPort.deleteBarrio(id);
    }
}