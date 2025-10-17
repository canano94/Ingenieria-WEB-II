import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Barrio } from "./Barrio.js";
import { User } from "./User.js"; // Asegúrate de importar tu entidad User

//// @Entity le dice a TypeORM que esta clase es un mapa para la tabla 'favorite'.
@Entity({ name: "favorite" })
export class Favorite {
    @PrimaryGeneratedColumn({ name: "idfav" })
    id!: number;

    // @OneToOne define una relación uno a uno con la entidad Barrio.
    @OneToOne("Barrio") 
    @JoinColumn({ name: "idbar" })
    barrio!: Barrio;
    // @ManyToOne define una relación muchos a uno con la entidad User.
    @ManyToOne("User", (user: User) => user.favorites) 
    @JoinColumn({ name: "iduser" })
    user!: User;
}