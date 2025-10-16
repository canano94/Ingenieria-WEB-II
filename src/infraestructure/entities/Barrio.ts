// Ubicación: src/infraestructure/entities/Barrio.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "barrio" })
export class Barrio {
  @PrimaryGeneratedColumn({ type: "int" })
  id_bar!: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  nam_bar!: string;

  @Column({ type: "decimal", precision: 10, scale: 6 })
  cor_sur!: number;

  @Column({ type: "decimal", precision: 10, scale: 6 })
  cor_nor!: number;

  @Column({ type: "decimal", precision: 10, scale: 6 })
  cor_ori!: number;

  @Column({ type: "decimal", precision: 10, scale: 6 })
  cor_occ!: number;

  @Column({ type: "int" })
  ind_seg!: number;

  @Column({ type: "varchar", length: 10, nullable: true })
  porcentaje?: string;
}
