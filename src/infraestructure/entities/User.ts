import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import { Favorite } from "./Favorite.js";
import bcrypt from "bcrypt";

// @Entity le dice a TypeORM que esta clase es un mapa para la tabla 'users'.
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "int", default: 1 })
  status!: number;

  // Antes de insertar un nuevo usuario, encripta la contraseña.
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  // @OneToMany define una relación uno a muchos con la entidad Favorite.
  @OneToMany("Favorite", (favorite: Favorite) => favorite.user) 
    favorites!: Favorite[];
}
