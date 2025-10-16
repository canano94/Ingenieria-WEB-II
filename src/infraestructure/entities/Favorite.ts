// Ubicación: src/infraestructure/entities/Favorite.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Barrio } from "./Barrio.js";
import { User } from "./User.js"; // Asegúrate de importar tu entidad User

@Entity({ name: "favorite" })
export class Favorite {
    @PrimaryGeneratedColumn({ name: "idfave" })
    id!: number;

    /**
     * RELACIÓN UNO A UNO CON BARRIO
     * Un favorito pertenece a un único barrio.
     * @JoinColumn indica que esta tabla contiene la clave foránea.
     */
    @OneToOne("Barrio") // <-- CAMBIO AQUÍ
    @JoinColumn({ name: "idbar" })
    barrio!: Barrio;

    @ManyToOne("User", (user: User) => user.favorites) // <-- CAMBIO AQUÍ
    @JoinColumn({ name: "iduser" })
    user!: User;
}