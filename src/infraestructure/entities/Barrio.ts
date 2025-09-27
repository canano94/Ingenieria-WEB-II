// Ubicación: src/infraestructure/entities/Barrio.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// @Entity le dice a TypeORM que esta clase es un modelo de la tabla.
@Entity({ name: 'barrio' })
export class Barrio {
    // @PrimaryGeneratedColumn define la columna id como llave primaria.
    @PrimaryGeneratedColumn()
    id_bar!: number;

    // @Column define una columna estándar en la tabla.
    @Column()
    nam_bar!: string;

    @Column('decimal', { precision: 10, scale: 6 })
    cor_sur!: number;

    @Column('decimal', { precision: 10, scale: 6 })
    cor_nor!: number;

    @Column('decimal', { precision: 10, scale: 6 })
    cor_ori!: number;

    @Column('decimal', { precision: 10, scale: 6 })
    cor_occ!: number;

    @Column()
    ind_seg!: number;

    @Column({ nullable: true })
    porcentaje?: string;
}