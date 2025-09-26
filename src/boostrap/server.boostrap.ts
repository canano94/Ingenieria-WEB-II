import http from 'http';
import express from 'express';


export class ServerBoostrap {
    private app!: express.Application;
    constructor (app:express.Application) {
        this.app = app;
    }

    init() {
        const server = http.createServer(this.app);
        const PORT = process.env.PORT || 4000;

        server.listen(PORT, () => {
        console.log("Server iniciado en http://localhost:" + PORT);
    });
}
}