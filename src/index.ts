import app from './app.js';
import { ServerBoostrap } from './boostrap/server.boostrap.js';

//instancia Express

const server = new ServerBoostrap(app);
server.init();


