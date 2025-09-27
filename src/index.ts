// Importaciones de librerías y módulos necesarios.
import { connect } from 'http2';
import app from './app.js';
import { ServerBoostrap } from './infraestructure/boostrap/server.boostrap.js';
import './infraestructure/config/environment-vars.js';
import { connectDB } from './infraestructure/config/database.js';

//Instancia de nuestro servidor, pasándole la app de Express.
const server = new ServerBoostrap(app);

// Usamos una función asíncrona autoejecutable para poder usar 'await'.
(
    async () => {
        try {
            // Primero, intentamos conectar a la base de datos.
            await connectDB();
            // Si la conexión es exitosa, iniciamos el servidor web.
            const instances = [server.init()];
            await Promise.all(instances);
        } catch (error) {
            // Si algo falla (la BD o el servidor), lo mostramos en consola y terminamos el proceso.
            console.log("Error starting server: ", error)
            process.exit(1);
        }
    }
)();
