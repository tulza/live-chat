import next from "next";
import { createServer } from "node:http";
import dotenv from "dotenv";
import { setupSocket } from "./socket/socket.js";
dotenv.config();

const dev = process.env.NODE_ENV !== "production";

const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
const httpServer = createServer(handler);

app.prepare().then(() => {
    setupSocket(httpServer);

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
