import "reflect-metadata";
import app from './app.js';
import { ServerBoostrap } from './infraestructure/boostrap/server.boostrap.js';
import './infraestructure/config/environment-vars.js';
import { connectDB } from './infraestructure/config/database.js';
const server = new ServerBoostrap(app);
(async () => {
    try {
        await connectDB();
        const instances = [server.init()];
        await Promise.all(instances);
    }
    catch (error) {
        console.error("❌ Error starting server:");
        console.error(error instanceof Error ? error.stack : error);
        process.exit(1);
    }
})();
//# sourceMappingURL=index.js.map