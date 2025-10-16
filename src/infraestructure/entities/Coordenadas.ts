// src/infraestructure/entities/Coordenadas.ts
import { Entity, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Barrio } from "./Barrio.js";

@Entity({ name: "coordenadas" })
export class Coordenadas {
    /**
     * Se le dice a TypeORM explícitamente que el tipo de columna es 'integer'.
     */
    @PrimaryColumn({ name: "id_barrio", type: "integer" }) // <-- AÑADE type: "integer" AQUÍ
    id_barrio!: number;

    // ... el resto de tu entidad
    
    @OneToOne(() => Barrio, (barrio) => barrio.coordenadas)
    @JoinColumn({ name: "id_barrio" })
    barrio!: Barrio;
}