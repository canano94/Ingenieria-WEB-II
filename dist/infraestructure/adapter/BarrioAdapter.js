import { AppDataSource } from "../config/database.js";
import { Barrio } from "../entities/Barrio.js";
export class BarrioAdapter {
    barrioRepository = AppDataSource.getRepository(Barrio);
    async findBarrioByCoordenadas(cor_sn, cor_oo) {
        return await this.barrioRepository
            .createQueryBuilder("barrio")
            .where(":cor_sn BETWEEN barrio.cor_sur AND barrio.cor_nor", { cor_sn })
            .andWhere(":cor_oo BETWEEN barrio.cor_occ AND barrio.cor_ori", { cor_oo })
            .getOne();
    }
}
//# sourceMappingURL=BarrioAdapter.js.map