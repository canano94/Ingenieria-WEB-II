// Configuración de la base de datos con TypeORM
import { DataSource } from 'typeorm';
import 'dotenv/config';
import envs from './environment-vars.js';

// Importar todas las entidades definidas
import { User } from '../entities/User.js';
import { Barrio } from '../entities/Barrio.js';
import { Coordenadas } from '../entities/Coordenadas.js';
import { Favorite } from '../entities/Favorite.js'; 

// Configuración del DataSource
export const AppDataSource = new DataSource({
    type: "postgres",
    host: envs.DB_HOST,
    port: Number(envs.DB_PORT), 
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [User, Barrio, Coordenadas, Favorite] 
});

// función connectDB para inicializar la conexión
export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("PostgreSQL encendido!");
    } catch (error) {
        console.error("Error al iniciar PostgreSQL:", error);
        process.exit(1);
    }
};