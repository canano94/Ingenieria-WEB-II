import http from 'http';
export class ServerBoostrap {
    app;
    constructor(app) {
        this.app = app;
    }
    init() {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);
            const PORT = process.env.PORT || 4000;
            server.listen(PORT)
                .on("listening", () => {
                console.log("Server is runing at port " + PORT);
                resolve(true);
            })
                .on("error", (err) => {
                console.log("Error starting server on port: " + err);
                reject(false);
            });
        });
    }
}
//# sourceMappingURL=server.boostrap.js.map