import discord from "../discord.js";
import SOCKET from "../../shared/socketEnum.js";

export const handleMessage = (io, socket) => {
    socket.on(SOCKET.MESSAGE, (message) => {
        discord.send(message);
        io.emit(SOCKET.MESSAGE, message);
    });
};
