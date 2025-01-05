import { Server } from "socket.io";
import { handleMessage } from "./handleMessage.js";
import SOCKET from "../../shared/socketEnum.js";
let onlineUsers = 0;
let userList = {};

export const setupSocket = (httpServer) => {
    const io = new Server(httpServer);

    io.on(SOCKET.CONNECT, (socket) => {
        console.log("a user has connected");

        userList[socket.client.id] = io.id;
        onlineUsers += 1;

        // debug
        console.log(userList);
        console.log(onlineUsers);

        io.emit(SOCKET.USER_COUNT, onlineUsers);

        socket.on(SOCKET.DISCONNECT, () => {
            onlineUsers -= 1;
            delete userList[socket.client.id];
        });

        handleMessage(io, socket);
    });

    return io;
};
