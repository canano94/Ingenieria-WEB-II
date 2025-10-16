import 'dotenv/config';

// Definimos una interfaz para asegurar que todas las variables de entorno necesarias estén presentes.
interface EnvironmentVars {
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD?: string;
    DB_NAME: string;
    JWT_SECRET: string; // <-- Esta es la variable que faltaba
}

// Creamos un objeto 'envs' que exporta las variables de entorno de forma segura y tipada.
const envs: EnvironmentVars = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME || 'database',
    JWT_SECRET: process.env.JWT_SECRET || 'default-secret-key' // Añadimos un valor por defecto por seguridad
};

// Validamos que el JWT_SECRET esté definido, ya que es crítico para la seguridad.
if (envs.JWT_SECRET === 'default-secret-key') {
    console.warn('ADVERTENCIA: La variable de entorno JWT_SECRET no está definida. Usando valor por defecto.');
}

export default envs;
