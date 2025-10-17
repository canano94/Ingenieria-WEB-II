// Ubicación: src/infraestructure/entities/Barrio.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Coordenadas } from "./Coordenadas.js";
import { Favorite } from "./Favorite.js";

//// @Entity le dice a TypeORM que esta clase es un mapa para la tabla 'barrio'.
@Entity({ name: "barrio" })
export class Barrio {
    // @PrimaryGeneratedColumn indica que esta columna es la clave primaria y se genera automáticamente.
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar" })
    nam_bar!: string;

    @Column({ type: "integer" })
    ind_seg!: number;

    @Column({ type: "varchar", nullable: true })
    porcentaje?: string;

    // @OneToOne define una relación uno a uno con la entidad Coordenadas.
    @OneToOne(() => Coordenadas, (coordenadas) => coordenadas.barrio, {
        cascade: true,
    })
    coordenadas!: Coordenadas;
    
    // @OneToOne define una relación uno a uno con la entidad Favorite.
    @OneToOne(() => Favorite, (favorite) => favorite.barrio)
    favorite!: Favorite;
}