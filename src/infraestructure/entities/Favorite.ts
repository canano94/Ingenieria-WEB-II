// Ubicación: src/infraestructure/entities/Favorite.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Barrio } from "./Barrio.js";
import { User } from "./User.js"; // Asegúrate de importar tu entidad User

@Entity({ name: "favorite" })
export class Favorite {
    @PrimaryGeneratedColumn({ name: "idfave" })
    id!: number;

   
    @OneToOne("Barrio") 
    @JoinColumn({ name: "idbar" })
    barrio!: Barrio;

    @ManyToOne("User", (user: User) => user.favorites) 
    @JoinColumn({ name: "iduser" })
    user!: User;
}