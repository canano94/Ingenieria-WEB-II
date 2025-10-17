import { AppDataSource } from "../config/database.js";
import { Barrio } from "../entities/Barrio.js";
import { Coordenadas } from "../entities/Coordenadas.js";
import { BarrioPort, CreateBarrioDto, UpdateBarrioDto } from "../../domain/BarrioPort.js";

//Este es el Adaptador, la implementación concreta del BarrioPort.
//Es la clase que de verdad habla con la base de datos para todo lo relacionado con Barrios.
export class BarrioAdapter implements BarrioPort {
   //Obtenemos los repositorios de TypeORM, que son nuestras herramientas directas para hacer queries a las tablas.
    private barrioRepository = AppDataSource.getRepository(Barrio);
    private coordenadasRepository = AppDataSource.getRepository(Coordenadas);

    //Implementación del método para buscar un barrio por coordenadas.
    async findBarrioByCoordenadas(cor_sn: number, cor_oo: number): Promise<Barrio | null> {
        //Usamos el QueryBuilder porque esta consulta es más compleja que un simple Buscar.
        return await this.barrioRepository
            .createQueryBuilder("barrio")
            //Unimos las tabla para poder usar sus columnas.
            .innerJoinAndSelect("barrio.coordenadas", "coordenadas")

             //Lógica del 'WHERE' para ver si un punto está dentro del rectángulo.
            .where(":cor_sn BETWEEN coordenadas.cor_sur AND coordenadas.cor_nor", { cor_sn })
            .andWhere(":cor_oo BETWEEN coordenadas.cor_occ AND coordenadas.cor_ori", { cor_oo })
            .getOne();
    }

    //Para traer todos, un .find() es suficiente.
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
        //Usamos una transacción(metodo para que corra completa la SQL o no se haga nada si falla). 
        //Esto asegura que si algo falla a la mitad,
        //no quede un barrio guardado sin sus coordenadas. O se hace todo, o no se hace nada.
        return AppDataSource.transaction(async (transactionalEntityManager) => {
            
            //Creamos el objeto Barrio.
            const newBarrio = new Barrio();
            newBarrio.nam_bar = data.nam_bar;
            newBarrio.ind_seg = data.ind_seg;
            newBarrio.porcentaje = data.porcentaje;
            //Lo guardamos en la BD.
            const savedBarrio = await transactionalEntityManager.save(newBarrio);
            //Luego creamos las coordenadas asociadas.
            const newCoordenadas = new Coordenadas();
            newCoordenadas.id_barrio = savedBarrio.id; // Relacion con el barrio
            newCoordenadas.cor_sur = data.coordenadas.cor_sur;
            newCoordenadas.cor_nor = data.coordenadas.cor_nor;
            newCoordenadas.cor_ori = data.coordenadas.cor_ori;
            newCoordenadas.cor_occ = data.coordenadas.cor_occ;
            await transactionalEntityManager.save(newCoordenadas);
            //Devolvemos el barrio completo con sus coordenadas.
            savedBarrio.coordenadas = newCoordenadas;
            return savedBarrio;
        });
    }

    async updateBarrio(id: number, data: UpdateBarrioDto): Promise<Barrio | null> {
        // Para actualizar, primero traemos el barrio que vamos a modificar.
        const barrio = await this.getBarrioById(id);
        if (!barrio) return null;

        
        Object.assign(barrio, data);
        if (data.coordenadas) {
            Object.assign(barrio.coordenadas, data.coordenadas);
        }

        // El método .save() de TypeORM es inteligente: si el objeto que le pasamos
        // ya tiene un ID, hace un UPDATE en lugar de un INSERT.
        return this.barrioRepository.save(barrio);
    }

    async deleteBarrio(id: number): Promise<boolean> {
        const deleteResult = await this.barrioRepository.delete(id);
        // Nos aseguramos de que si se haya borrado algo.
        return deleteResult.affected !== null && deleteResult.affected! > 0;
    }
}