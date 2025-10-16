// src/infraestructure/config/database.ts

import { DataSource } from 'typeorm';
import 'dotenv/config';
import envs from './environment-vars.js';

// Importar entidades 
import { User } from '../entities/User.js';
import { Barrio } from '../entities/Barrio.js';
import { Coordenada } from '../entities/Cordenada.js';

export const AppDataSource = new DataSource({
    type: "postgres", 
    host: envs.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Barrio, Coordenada]
});

// función connectDB para inicializar la conexión
export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("PostgreSQL Data Source has been initialized!");
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
        process.exit(1);
    }
};