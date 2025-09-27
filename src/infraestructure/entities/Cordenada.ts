import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'cordenada' })
export class Coordenada {
    @PrimaryGeneratedColumn()
    id_cor!: number;

    @Column('decimal', { precision: 10, scale: 6 })
    cor_sn!: number;

    @Column('decimal', { precision: 10, scale: 6 })
    cor_oo!: number;

}