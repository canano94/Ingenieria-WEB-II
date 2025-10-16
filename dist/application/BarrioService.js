export class BarrioService {
    barrioPort;
    constructor(barrioPort) {
        this.barrioPort = barrioPort;
    }
    async findBarrioByCoordenadas(cor_sn, cor_oo) {
        const barrio = await this.barrioPort.findBarrioByCoordenadas(cor_sn, cor_oo);
        if (!barrio)
            return null;
        return {
            nombre: barrio.nam_bar,
            indiceSeguridad: barrio.ind_seg
        };
    }
}
//# sourceMappingURL=BarrioService.js.map