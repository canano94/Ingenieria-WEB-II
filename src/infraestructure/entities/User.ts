// Ubicación: src/infraestructure/entities/User.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ default: 1 })
    status!: number;
}