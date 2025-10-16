// Ubicación: src/infraestructure/entities/Barrio.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Coordenadas } from "./Coordenadas.js";
import { Favorite } from "./Favorite.js";

@Entity({ name: "barrio" })
export class Barrio {
    // La columna en tu diagrama se llama 'id', usamos esa.
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar" })
    nam_bar!: string;

    @Column({ type: "integer" })
    ind_seg!: number;

    @Column({ type: "varchar", nullable: true })
    porcentaje?: string;

    /**
     * Define el otro lado de la relación 1 a 1.
     * Esto te permitirá acceder a las coordenadas desde un objeto Barrio,
     * por ejemplo: `miBarrio.coordenadas`.
     * 'cascade: true' es útil para que al guardar un Barrio,
     * también se guarden/actualicen sus coordenadas asociadas.
     */
    @OneToOne(() => Coordenadas, (coordenadas) => coordenadas.barrio, {
        cascade: true,
    })
    coordenadas!: Coordenadas;

    @OneToOne(() => Favorite, (favorite) => favorite.barrio)
    favorite!: Favorite;
}