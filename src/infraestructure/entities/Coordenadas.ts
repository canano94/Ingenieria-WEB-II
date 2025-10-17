import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Barrio } from "./Barrio.js";
//// @Entity le dice a TypeORM que esta clase es un mapa para la tabla 'coordenadas'.
@Entity({ name: "coordenadas" })
export class Coordenadas {
    @PrimaryColumn({ type: "integer", name: "id_barrio" })
    id_barrio!: number;

    @Column({ type: "numeric", precision: 10, scale: 6 })
    cor_sur!: number;

    @Column({ type: "numeric", precision: 10, scale: 6 })
    cor_nor!: number;

    @Column({ type: "numeric", precision: 10, scale: 6 })
    cor_ori!: number;

    @Column({ type: "numeric", precision: 10, scale: 6 })
    cor_occ!: number;
    
    // @OneToOne define una relación uno a uno con la entidad Barrio.
    @OneToOne(() => Barrio, (barrio) => barrio.coordenadas)
    @JoinColumn({ name: "id_barrio" })
    barrio!: Barrio;
}