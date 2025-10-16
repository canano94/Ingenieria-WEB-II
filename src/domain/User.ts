import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'integer', default: 1 }) // 1 para activo, 0 para inactivo
    status!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    // Hook para hashear la contraseña antes de guardar
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        // Solo hashea la contraseña si ha sido modificada
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    /**
     * Método para comparar la contraseña en texto plano con la hasheada.
     * ESTE ES EL MÉTODO QUE SOLUCIONA EL ERROR.
     * @param password La contraseña a comparar.
     * @returns Una promesa que resuelve a `true` si las contraseñas coinciden, de lo contrario `false`.
     */
    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

