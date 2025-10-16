// Ubicación: src/infraestructure/adapter/BarrioAdapter.ts

import { AppDataSource } from "../config/database.js";
import { Barrio } from "../entities/Barrio.js";
import { Coordenadas } from "../entities/Coordenadas.js";
import { BarrioPort, CreateBarrioDto, UpdateBarrioDto } from "../../domain/BarrioPort.js";

export class BarrioAdapter implements BarrioPort {
    private barrioRepository = AppDataSource.getRepository(Barrio);
    private coordenadasRepository = AppDataSource.getRepository(Coordenadas);

    
    async findBarrioByCoordenadas(cor_sn: number, cor_oo: number): Promise<Barrio | null> {
        return await this.barrioRepository
            .createQueryBuilder("barrio")
            
            .innerJoinAndSelect("barrio.coordenadas", "coordenadas")
           
            .where(":cor_sn BETWEEN coordenadas.cor_sur AND coordenadas.cor_nor", { cor_sn })
            .andWhere(":cor_oo BETWEEN coordenadas.cor_occ AND coordenadas.cor_ori", { cor_oo })
            .getOne();
    }

    
    async getAllBarrios(): Promise<Barrio[]> {
        return this.barrioRepository.find({ relations: ["coordenadas"] });
    }

    async getBarrioById(id: number): Promise<Barrio | null> {
        return this.barrioRepository.findOne({
            where: { id },
            relations: ["coordenadas"],
        });
    }

    async createBarrio(data: CreateBarrioDto): Promise<Barrio> {
       
        return AppDataSource.transaction(async (transactionalEntityManager) => {
            const newBarrio = new Barrio();
            newBarrio.nam_bar = data.nam_bar;
            newBarrio.ind_seg = data.ind_seg;
            newBarrio.porcentaje = data.porcentaje;
            const savedBarrio = await transactionalEntityManager.save(newBarrio);

            const newCoordenadas = new Coordenadas();
            newCoordenadas.id_barrio = savedBarrio.id; // Enlace clave
            newCoordenadas.cor_sur = data.coordenadas.cor_sur;
            newCoordenadas.cor_nor = data.coordenadas.cor_nor;
            newCoordenadas.cor_ori = data.coordenadas.cor_ori;
            newCoordenadas.cor_occ = data.coordenadas.cor_occ;
            await transactionalEntityManager.save(newCoordenadas);

            savedBarrio.coordenadas = newCoordenadas;
            return savedBarrio;
        });
    }

    async updateBarrio(id: number, data: UpdateBarrioDto): Promise<Barrio | null> {
        const barrio = await this.getBarrioById(id);
        if (!barrio) return null;

        
        Object.assign(barrio, data);
        if (data.coordenadas) {
            Object.assign(barrio.coordenadas, data.coordenadas);
        }

        // TypeORM es suficientemente inteligente para guardar la entidad principal y sus relaciones modificadas
        return this.barrioRepository.save(barrio);
    }

    async deleteBarrio(id: number): Promise<boolean> {
        const deleteResult = await this.barrioRepository.delete(id);
        return deleteResult.affected !== null && deleteResult.affected! > 0;
    }
}