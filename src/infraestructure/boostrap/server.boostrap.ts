//Servidor HTTP con Express
import http from 'http';
import express from 'express';


export class ServerBoostrap {
    private app!: express.Application;
    constructor(app: express.Application) {
        this.app = app;
    }

    init(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);
            const PORT = process.env.PORT || 4000;
            server.listen(PORT)
            .on("listening",()=>{
                console.log("Servidoriniciado en el puerto "+PORT);
                resolve(true);
            })
            .on("error",(err)=>{
                console.log("Error al iniciar el servidor en el puerto: "+err);
                reject(false);
            })

        });
    }
}

