import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

let onlineUsers = 0;

// when using middleware `hostname` and `port` must be provided below

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("a user has connected");
        onlineUsers += 1;
        console.log(onlineUsers);

        io.emit("numberOfUsers", onlineUsers);

        socket.on("disconnect", () => {
            onlineUsers -= 1;
            console.log("a user has disconnected");
        });

        socket.on("message", (message) => {
            // console.log(message);
            io.emit("message", message);
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
