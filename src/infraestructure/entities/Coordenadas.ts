// Ubicación: src/infraestructure/entities/Coordenadas.ts

import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Barrio } from "./Barrio.js";

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
   
    @OneToOne(() => Barrio, (barrio) => barrio.coordenadas)
    @JoinColumn({ name: "id_barrio" })
    barrio!: Barrio;
}