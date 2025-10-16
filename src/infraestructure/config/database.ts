// src/infraestructure/config/database.ts

import { DataSource } from 'typeorm';
import 'dotenv/config';
import envs from './environment-vars.js';

// Importar todas tus entidades
import { User } from '../entities/User.js';
import { Barrio } from '../entities/Barrio.js';
import { Coordenadas } from '../entities/Coordenadas.js';
import { Favorite } from '../entities/Favorite.js'; 

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
        console.log("PostgreSQL Data Source has been initialized!");
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
        process.exit(1);
    }
};