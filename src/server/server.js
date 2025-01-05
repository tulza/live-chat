import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const discord_webhook = process.env.DISCORD_WEBHOOK;

const hostname = "localhost";
const port = 3000;

let onlineUsers = 0;
let userList = {};

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("a user has connected");
        userList[socket.client.id] = io.id;
        onlineUsers += 1;

        console.log(userList);
        console.log(onlineUsers);

        io.emit("numberOfUsers", onlineUsers);

        socket.on("disconnect", () => {
            onlineUsers -= 1;
            delete userList[socket.client.id];

            console.log(`a user(${socket.client.id}) has disconnected`);
        });

        socket.on("message", (message) => {
            // console.log(message);

            fetch(discord_webhook, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: message.message,
                    username: message.name,
                }),
            }).then((response) => {
                if (response.ok) console.log("Message sent successfully!");
                else
                    console.error(
                        "Failed to send message:",
                        response.statusText
                    );
            });

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
