import 'dotenv/config';
// Creamos un objeto 'envs' que exporta las variables de entorno de forma segura y tipada.
const envs = {
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
//# sourceMappingURL=environment-vars.js.map