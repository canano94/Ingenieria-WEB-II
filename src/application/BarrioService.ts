// Ubicación: src/application/BarrioService.ts

import { Barrio } from "../infraestructure/entities/Barrio.js";
import { BarrioPort, CreateBarrioDto, UpdateBarrioDto } from "../domain/BarrioPort.js";


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

export class BarrioService {
    constructor(private readonly barrioPort: BarrioPort) {}

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

    async findBarrioByCoordenadas(cor_sn: number, cor_oo: number): Promise<BarrioResponseDto | null> {
        const barrio = await this.barrioPort.findBarrioByCoordenadas(cor_sn, cor_oo);
        return barrio ? this.mapBarrioToResponse(barrio) : null;
    }

    async getAllBarrios(): Promise<BarrioResponseDto[]> {
        const barrios = await this.barrioPort.getAllBarrios();
        return barrios.map(this.mapBarrioToResponse);
    }

    async getBarrioById(id: number): Promise<BarrioResponseDto | null> {
        const barrio = await this.barrioPort.getBarrioById(id);
        return barrio ? this.mapBarrioToResponse(barrio) : null;
    }

    async createBarrio(data: CreateBarrioDto): Promise<BarrioResponseDto> {
        const newBarrio = await this.barrioPort.createBarrio(data);
        return this.mapBarrioToResponse(newBarrio);
    }

    async updateBarrio(id: number, data: UpdateBarrioDto): Promise<BarrioResponseDto | null> {
        const updatedBarrio = await this.barrioPort.updateBarrio(id, data);
        return updatedBarrio ? this.mapBarrioToResponse(updatedBarrio) : null;
    }

    async deleteBarrio(id: number): Promise<boolean> {
        return this.barrioPort.deleteBarrio(id);
    }
}